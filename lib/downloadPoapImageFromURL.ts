import { createWriteStream } from 'fs';
import https from 'https';
import path from 'path';

export default function downloadPoapImageFromURL(url: string, filename: string) {
  // download the images to the public/poaps folder
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return;
      }

      const fileStream = createWriteStream(path.join(process.cwd(), 'public/poaps', filename));
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        resolve(true);
      });

      fileStream.on('error', (err) => {
        reject(false);
      });

    }).on('error', (err) => {
      reject(false);
    });
  })
}