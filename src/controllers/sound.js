import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import ffmpeg from 'fluent-ffmpeg';
import File from '../models/sound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export const uploadMiddleware = upload.single('file');

export const uploadFile = async (req, res) => {
  try {
    const fileData = new File({
      filename: req.file.filename,
      path: req.file.path,
      originalName: req.file.originalname,
    });

    console.log(fileData);

    // Apply sound filtering using ffmpeg
    const filteredFilePath = `uploads/filtered-${req.file.filename}`;
    
    ffmpeg(req.file.path)
      .audioFilters('highpass=f=300, lowpass=f=3000')
      .on('end', async () => {
        // Load the filtered audio file
        const audioBuffer = fs.readFileSync(filteredFilePath);

        // Proceed with sending the audioTensor to TensorFlow
        // For example, passing it to your TensorFlow model
        // const result = yourTensorFlowModel.predict(audioTensor);

        // Save the fileData after filtering and processing
        await fileData.save();

        res.status(200).send({
          message: 'File uploaded and filtered successfully',
          fileUrl: `${apiURL}/uploads/filtered-${req.file.filename}`,
        });
      })
      .on('error', (err) => {
        console.error('Error in audio filtering: ', err);
        res.status(500).send('Internal Server Error');
      })
      .save(filteredFilePath);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};