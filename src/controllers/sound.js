import { createWriteStream } from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import { ObjectId } from 'mongodb';


export async function uploadFromMongoDB(req, res) {
  const { fileId } = req.body;

  if (!fileId) {
    return res.status(400).send('No file ID provided.');
  }

  try {
    const tempFilePath = '/tmp/temp-audio.wav';
    const downloadStream = req.app.locals.bucket.openDownloadStream(ObjectId(fileId));
    const writeStream = createWriteStream(tempFilePath);

    downloadStream.pipe(writeStream)
      .on('error', (err) => {
        res.status(500).send(`Error downloading file: ${err.message}`);
      })
      .on('finish', async () => {
        console.log(`File downloaded to ${tempFilePath}`);

        await filterSound(tempFilePath);

        res.send('File processed successfully.');
      });
  } catch (err) {
    res.status(500).send(`Error processing file: ${err.message}`);
  }
}

async function filterSound(filePath) {
  return new Promise((resolve, reject) => {
    const outputPath = filePath.replace('.wav', '-filtered.wav');
    ffmpeg(filePath)
      .audioFilters('bass=g=3')
      .on('end', () => {
        console.log(`Filtered file saved to ${outputPath}`);
        resolve();
      })
      .on('error', reject)
      .save(outputPath);
  });
}
