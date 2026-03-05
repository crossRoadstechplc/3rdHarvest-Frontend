# Logo Generation Instructions

I've created several options to generate the `logo.png` file based on your navbar text "THE 3RD HARVEST".

## Option 1: Using the HTML Generator (Easiest)

1. Open `public/generate-logo.html` in your web browser
2. Click the "Download logo.png" button
3. Save the file to `public/logo.png`

## Option 2: Using Node.js Script

If you have Node.js installed and want to use the script:

```bash
npm install canvas
node scripts/generate-logo.js
```

This will generate `public/logo.png` automatically.

## Option 3: Using the SVG File

The `public/logo.svg` file has been created. You can:
- Use an online SVG to PNG converter (like https://cloudconvert.com/svg-to-png)
- Use image editing software (Photoshop, GIMP, etc.)
- Use command line tools like ImageMagick: `convert logo.svg -resize 1200x630 logo.png`

## Logo Specifications

- **Text**: "THE 3RD HARVEST"
- **Colors**: 
  - "THE" and "HARVEST": #1c3b2b (bloomGreen)
  - "3RD": #d4a858 (bloomGold)
- **Font**: Helvetica Neue, Bold
- **Size**: 1200x630px (optimal for social media sharing)
- **Background**: #f8f9f5 (bloomBeige)

## Quick Solution

The easiest way is to:
1. Open `public/generate-logo.html` in Chrome/Firefox
2. Right-click on the canvas
3. Select "Save image as..." or use the download button
4. Save as `logo.png` in the `public` folder
