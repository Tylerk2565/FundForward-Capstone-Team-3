import express from 'express';
import getProfile from '../controllers/profileController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();

router.get('/', verifyJWT, getProfile);

export default router;