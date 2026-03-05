// Node.js script to generate logo.png
// Run with: node scripts/generate-logo.js
// Requires: npm install canvas

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const width = 1200;
const height = 630;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = '#f8f9f5';
ctx.fillRect(0, 0, width, height);

// Logo text styling
ctx.font = 'bold 120px "Helvetica Neue", Helvetica, Arial, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Draw "THE"
ctx.fillStyle = '#1c3b2b'; // bloomGreen
ctx.fillText('THE', width / 2, height / 2 - 70);

// Draw "3RD" in gold
ctx.fillStyle = '#d4a858'; // bloomGold
ctx.fillText('3RD', width / 2, height / 2);

// Draw "HARVEST"
ctx.fillStyle = '#1c3b2b'; // bloomGreen
ctx.fillText('HARVEST', width / 2, height / 2 + 70);

// Optional: Decorative line
ctx.strokeStyle = '#d4a858';
ctx.lineWidth = 2;
ctx.globalAlpha = 0.3;
ctx.beginPath();
ctx.moveTo(400, height / 2 + 150);
ctx.lineTo(800, height / 2 + 150);
ctx.stroke();

// Save to file
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '..', 'public', 'logo.png');
fs.writeFileSync(outputPath, buffer);

console.log(`✅ Logo generated successfully at: ${outputPath}`);
console.log(`   Dimensions: ${width}x${height}px`);
