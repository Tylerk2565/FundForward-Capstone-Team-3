import express from 'express'
import fundraiserController from '../../controllers/api/fundraiserController.js'
const router = express.Router()

router.get('/fundraiser', fundraiserController.handleFundApi);

export default router;