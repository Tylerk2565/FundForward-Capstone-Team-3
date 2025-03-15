import express from 'express'
import authController from '../controllers/authController.js'
import validateUserInput from '../middleware/validateUserInput.js';
import loginSchema from '../Validators/loginValidator.js';
import verifyJWT from '../middleware/verifyJWT.js';
import verifyRoles from '../middleware/verifyRoles.js';

const router = express.Router()

router.post('/', validateUserInput(loginSchema),authController.handleLogin);

export default router;