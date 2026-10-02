const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// Generador de PNG con dibujo de Martillo
function createHammerPng(size) {
  const width = size;
  const height = size;
  const rawData = Buffer.alloc(height * (1 + width * 4));

  // Matriz de coordenadas normalizadas (0 a 1)
  // Martillo inclinado a 45 grados o vertical
  // Hagamos un martillo centrado y muy claro:
  // Cabeza en la parte superior (metal oscuro/acero)
  // Mango hacia abajo (madera / acento naranja)

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter 0
    for (let x = 0; x < width; x++) {
      const nx = x / width;
      const ny = y / height;

      // Distancia al centro para esquinas redondeadas del icono de app
      const cornerR = 0.22;
      const isInsideAppIcon = (
        (nx >= cornerR && nx <= 1 - cornerR) ||
        (ny >= cornerR && ny <= 1 - cornerR) ||
        Math.hypot(nx - cornerR, ny - cornerR) <= cornerR ||
        Math.hypot(nx - (1 - cornerR), ny - cornerR) <= cornerR ||
        Math.hypot(nx - cornerR, ny - (1 - cornerR)) <= cornerR ||
        Math.hypot(nx - (1 - cornerR), ny - (1 - cornerR)) <= cornerR
      );

      if (!isInsideAppIcon) {
        // Transparente fuera del icono redondeado
        rawData[offset++] = 0;
        rawData[offset++] = 0;
        rawData[offset++] = 0;
        rawData[offset++] = 0;
        continue;
      }

      // Fondo del icono: Azul Marino Profundo (#0F172A) con borde ámbar suave
      let r = 15, g = 23, b = 42, a = 255;

      // Borde exterior ámbar fino (#F59E0B)
      const distFromEdge = Math.min(nx, 1 - nx, ny, 1 - ny);
      if (distFromEdge < 0.035) {
        r = 245; g = 158; b = 11;
      }

      // Coordenadas rotadas a 45 grados para el martillo
      // Centro en (0.5, 0.52)
      const cx = nx - 0.5;
      const cy = ny - 0.52;
      // Rotar -45 grados:
      const rx = (cx - cy) * 0.7071;
      const ry = (cx + cy) * 0.7071;

      // El martillo en coordenadas rotadas (ry es el eje vertical del martillo):
      // Mango: rx entre -0.05 y +0.05, ry entre -0.15 y +0.35
      const isHandle = (Math.abs(rx) <= 0.045 && ry >= -0.12 && ry <= 0.35);

      // Agarre de goma al final del mango:
      const isHandleGrip = (Math.abs(rx) <= 0.052 && ry >= 0.18 && ry <= 0.36);

      // Cabeza del martillo:
      // Cabeza rectangular metálica: rx entre -0.24 y +0.24, ry entre -0.28 y -0.12
      const isHead = (rx >= -0.25 && rx <= 0.25 && ry >= -0.26 && ry <= -0.12);

      // Uña del martillo (curva hacia la izquierda en -rx):
      const isClaw = (rx < -0.18 && rx >= -0.32 && ry >= -0.28 && ry <= -0.14 && (ry - (-0.28)) > (-(rx - (-0.18)) * 0.8));

      // Golpeador plano (derecha):
      const isStriker = (rx >= 0.22 && rx <= 0.28 && ry >= -0.24 && ry <= -0.14);

      if (isHead || isStriker) {
        // Cabeza de acero / titanio brillante (#E2E8F0 a #94A3B8)
        if (ry < -0.19) {
          r = 241; g = 245; b = 249; // brillo superior
        } else {
          r = 148; g = 163; b = 184; // sombra inferior
        }
      } else if (isClaw) {
        r = 203; g = 213; b = 225;
      } else if (isHandleGrip) {
        // Agarre ámbar vibrante (#F59E0B)
        r = 245; g = 158; b = 11;
      } else if (isHandle) {
        // Madera / fibra pulida (#D97706)
        r = 217; g = 119; b = 6;
      }

      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
      rawData[offset++] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = calcCrc(buf.slice(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  function calcCrc(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320);
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

const resMap = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

const baseAndroidRes = 'c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\metalcot_apk\\android\\app\\src\\main\\res';

for (const [folder, size] of Object.entries(resMap)) {
  const targetDir = path.join(baseAndroidRes, folder);
  if (fs.existsSync(targetDir)) {
    const png = createHammerPng(size);
    fs.writeFileSync(path.join(targetDir, 'ic_launcher.png'), png);
    console.log(`Updated ${folder}/ic_launcher.png (${size}x${size})`);
  }
}

// Actualizar también los iconos PWA
const p192 = createHammerPng(192);
const p512 = createHammerPng(512);
fs.writeFileSync('c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\icons\\icon-192.png', p192);
fs.writeFileSync('c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\icons\\icon-512.png', p512);

// Actualizar el archivo .ico de Windows
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);

const entry = Buffer.alloc(16);
entry.writeUInt8(192, 0);
entry.writeUInt8(192, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(p192.length, 8);
entry.writeUInt32LE(22, 12);

const icoFile = Buffer.concat([icoHeader, entry, p192]);
fs.writeFileSync('c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\CotyFT.ico', icoFile);

console.log('All hammer icons generated successfully!');
