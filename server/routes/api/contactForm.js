import express from 'express';
import { handleContactForm, getContactForm, markAsRead, deleteMessage } from '../../controllers/api/contactFormController.js';

const router = express.Router();

router.post('/', handleContactForm);
router.get('/', getContactForm);
router.patch('/markAsRead/:id', markAsRead);
router.delete('/:id', deleteMessage);

export default router;
