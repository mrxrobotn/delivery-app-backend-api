import express from 'express';
import { uploadMiddleware, uploadFile } from '../controllers/sound.js';

const router = express.Router();

router.route("/upload").post(uploadMiddleware, uploadFile);

export default router;