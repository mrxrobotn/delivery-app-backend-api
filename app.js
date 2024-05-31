import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import File from './src/models/sound.js'
import ffmpeg from 'fluent-ffmpeg';

import userRoutes from './src/routes/user.js';
import carsRoutes from './src/routes/car.js';
import soundsRoutes from './src/routes/sound.js';

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



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use(express.json());
app.use(`${apiURL}/users`, userRoutes);
app.use(`${apiURL}/cars`, carsRoutes);
app.use(`${apiURL}/uploads`, soundsRoutes);


export default app;