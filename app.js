import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import File from './src/models/audio.js'

import userRoutes from './src/routes/user.js';
import carsRoutes from './src/routes/car.js';

const app = express();

const apiURL = '/api/v1';
var db_url = '';

if (process.env.NODE_ENV === 'dev') {
  db_url = process.env.DB_URL_ATLAS;
  app.use(morgan('dev'));
} else {
  db_url = process.env.DB_URL_ATLAS;
}

mongoose
  .connect(`${db_url}`)
  .then(() => {
    console.log(`Connected to database in mode ${process.env.NODE_ENV}`);
    app.use(cors());
  })
  .catch(err => {
    console.log(err);
  });

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup
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

// Endpoint to handle file uploads
app.post(`${apiURL}/upload`, upload.single('file'), async (req, res) => {
  try {
    const fileData = new File({
      filename: req.file.filename,
      path: req.file.path,
      originalName: req.file.originalname,
    });

    await fileData.save();

    res.status(200).send({
      message: 'File uploaded successfully',
      fileUrl: `${apiURL}/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use(express.json());
app.use(`${apiURL}/users`, userRoutes);
app.use(`${apiURL}/cars`, carsRoutes);

export default app;