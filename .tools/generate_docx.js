const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType } = require('./node_modules/docx');

/**
 * Creates a professional Word document (.docx) from structured data.
 * @param {string} filePath - Absolute path to save the .docx file
 * @param {object} docData - { title, subtitle, author, subject, sections: [ { title, paragraphs: [], codeBlocks: [], tips: [] } ] }
 */
async function createWordDocument(filePath, docData) {
  const children = [];

  // Title
  children.push(
    new Paragraph({
      text: docData.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120, before: 200 }
    })
  );

  // Subtitle / Metainfo
  if (docData.subtitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: docData.subtitle,
            italics: true,
            size: 24, // 12pt
            color: "555555"
          })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      })
    );
  }

  // Meta box / Header info
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Materia: `, bold: true }),
        new TextRun({ text: `${docData.subject || 'Aplicaciones Web - Grupo 4-C'}\n` }),
        new TextRun({ text: `Fecha: `, bold: true }),
        new TextRun({ text: `${new Date().toLocaleDateString('es-ES')}\n` }),
        new TextRun({ text: `Estado: `, bold: true }),
        new TextRun({ text: `Completado y Verificado`, color: "2E7D32", bold: true })
      ],
      spacing: { after: 300 }
    })
  );

  // Divider
  children.push(
    new Paragraph({
      text: "_______________________________________________________________________________",
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 }
    })
  );

  // Process sections
  for (const section of docData.sections) {
    // Section Heading
    if (section.title) {
      children.push(
        new Paragraph({
          text: section.title,
          heading: section.level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 }
        })
      );
    }

    // Content items
    if (section.content && Array.isArray(section.content)) {
      for (const item of section.content) {
        if (typeof item === 'string') {
          children.push(
            new Paragraph({
              children: [new TextRun({ text: item, size: 22 })], // 11pt
              spacing: { after: 120, line: 276 }
            })
          );
        } else if (item.type === 'bullet') {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: item.bold ? `${item.bold}: ` : '', bold: true }),
                new TextRun({ text: item.text, size: 22 })
              ],
              bullet: { level: 0 },
              spacing: { after: 80 }
            })
          );
        } else if (item.type === 'tip') {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: "💡 Explicación sencilla: ", bold: true, color: "1565C0" }),
                new TextRun({ text: item.text, italics: true, color: "0D47A1" })
              ],
              spacing: { before: 100, after: 120 }
            })
          );
        } else if (item.type === 'code') {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: item.code,
                  font: "Consolas",
                  size: 19,
                  color: "24292E"
                })
              ],
              spacing: { before: 80, after: 120 }
            })
          );
        }
      }
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buffer);
  console.log(`Documento Word generado exitosamente en: ${filePath}`);
}

module.exports = { createWordDocument };
