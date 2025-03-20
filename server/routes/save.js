import express from 'express';
import handleSavePost from '../controllers/saveController.js';

const router = express.Router();

router.post('/', handleSavePost);

export default router;
   