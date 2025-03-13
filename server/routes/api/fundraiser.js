import express from 'express'
import fundraiserController from '../../controllers/api/fundraiserController.js'
const router = express.Router()

router.post('/fundraiser', fundraiserController.handleFundApi);

export default router;