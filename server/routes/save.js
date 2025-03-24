import express from 'express';
import handleSavePost from '../controllers/saveController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.post('/', handleSavePost);

export default router;
   