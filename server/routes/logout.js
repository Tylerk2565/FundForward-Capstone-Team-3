import express from 'express'
const router = express.Router()
import handleLogout from '../controllers/logoutController.js'
import e from 'express';

router.get('/', handleLogout);

export default router;