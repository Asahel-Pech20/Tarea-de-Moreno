const fs = require('fs');
const zlib = require('zlib');

function createPng(size, text) {
  // Simple solid rounded square icon with text/color
  const width = size;
  const height = size;
  const rawData = Buffer.alloc(height * (1 + width * 4));
  
  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      // Dark navy background with amber accent border/square
      const border = 8;
      const isAmberBox = (x > size * 0.25 && x < size * 0.75 && y > size * 0.25 && y < size * 0.75);
      
      if (isAmberBox) {
        // Amber #f59e0b
        rawData[offset++] = 245; // R
        rawData[offset++] = 158; // G
        rawData[offset++] = 11;  // B
        rawData[offset++] = 255; // A
      } else {
        // Navy #0f172a
        rawData[offset++] = 15;
        rawData[offset++] = 23;
        rawData[offset++] = 42;
        rawData[offset++] = 255;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth
  ihdr[9] = 6; // Color type (RGBA)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

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

  // CRC32 table
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

  const chunkIHDR = makeChunk('IHDR', ihdr);
  const chunkIDAT = makeChunk('IDAT', deflated);
  const chunkIEND = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, chunkIHDR, chunkIDAT, chunkIEND]);
}

const p192 = createPng(192, 'MC');
const p512 = createPng(512, 'MC');

fs.writeFileSync('c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\icons\\icon-192.png', p192);
fs.writeFileSync('c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\icons\\icon-512.png', p512);
console.log('Icons created successfully');
