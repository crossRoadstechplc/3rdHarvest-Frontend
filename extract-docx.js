const fs = require('fs');
const path = require('path');

// Simple script to attempt docx content extraction
// This is a basic approach - for full docx parsing, we'd need a library like mammoth

const docxPath = 'new content.docx';
const outputPath = 'content.txt';

try {
  // Read the docx file as buffer
  const docxBuffer = fs.readFileSync(docxPath);
  
  // Basic text extraction from docx (this is simplified)
  // In a real scenario, you'd use a library like mammoth
  const text = docxBuffer.toString('utf8', 0, Math.min(10000, docxBuffer.length));
  
  // Try to extract readable text patterns
  const readableText = text.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
                           .replace(/\s+/g, ' ')
                           .trim();
  
  fs.writeFileSync(outputPath, readableText);
  console.log(`Content extracted to ${outputPath}`);
  console.log(`Extracted ${readableText.length} characters`);
  
} catch (error) {
  console.error('Error extracting content:', error.message);
  
  // Fallback: create a template file for manual content
  const template = `# Content from new content.docx

Please paste the content from your Word document here.

## Sections found:
- [Section 1]
- [Section 2] 
- [Section 3]

## Notes:
This file was created because automatic docx extraction failed.
Please manually copy the content from new content.docx into this file.
`;
  
  fs.writeFileSync(outputPath, template);
  console.log(`Created template file ${outputPath} for manual content entry`);
}
