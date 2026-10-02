const fs = require('fs');

const pngBuffer = fs.readFileSync('c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\icons\\icon-192.png');

// Build 1-entry ICO header
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type 1 = icon
icoHeader.writeUInt16LE(1, 4); // count 1

const entry = Buffer.alloc(16);
entry.writeUInt8(192, 0); // width (192)
entry.writeUInt8(192, 1); // height (192)
entry.writeUInt8(0, 2);   // color palette
entry.writeUInt8(0, 3);   // reserved
entry.writeUInt16LE(1, 4); // planes
entry.writeUInt16LE(32, 6); // bpp
entry.writeUInt32LE(pngBuffer.length, 8); // size
entry.writeUInt32LE(22, 12); // offset (6 + 16 = 22)

const icoFile = Buffer.concat([icoHeader, entry, pngBuffer]);
fs.writeFileSync('c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\MetalCot.ico', icoFile);
console.log('ICO generated successfully at c:\\Tareas del 4-C\\Aplicaciones web\\04-Proyecto-MetalCot-Mobile\\MetalCot.ico');
