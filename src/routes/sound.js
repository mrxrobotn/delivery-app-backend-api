import { Router } from 'express';
const router = Router();
import { uploadFromMongoDB } from '../controllers/sound.js';

router.post('/upload/mongodb', uploadFromMongoDB);

export default router;