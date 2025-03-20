import express from 'express'
import { handleContactForm, getContactForm } from '../../controllers/api/contactFormController.js'
const router = express.Router()

router.post('/', handleContactForm);
router.get('/', getContactForm);

export default router;