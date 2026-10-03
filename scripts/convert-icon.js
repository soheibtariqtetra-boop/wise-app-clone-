import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = fs.readFileSync(path.resolve('src/assets/app-icon/wise-app-icon.svg'));

async function generate() {
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile('src/assets/app-icon/icon-192x192.png');
  
  console.log('192 done');

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('src/assets/app-icon/icon-512x512.png');
    
  console.log('512 done');
}

generate().catch(console.error);
