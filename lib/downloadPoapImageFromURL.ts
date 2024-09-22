import https from 'https';
import path from 'path';
import sharp from 'sharp';

export default function downloadPoapImageFromURL(url: string, filename: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${res.statusCode}`));
        return;
      }

      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        try {
          const outputPath = path.join(process.cwd(), 'public/poaps', filename.replace('.png', '.webp'));
          await sharp(buffer)
            .resize(400, 400, { fit: 'cover' })
            .webp({ quality: 80 })
            .toFile(outputPath);

          resolve(true);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}
