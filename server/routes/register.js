import express from 'express'
const router = express.Router()
import registerController from '../controllers/registerController.js'
import validateUserInput from '../middleware/validateUserInput.js';
import userSchema  from '../Validators/newUserValidator.js'; 

router.post('/', validateUserInput(userSchema), registerController.handleNewUser);

export default router;