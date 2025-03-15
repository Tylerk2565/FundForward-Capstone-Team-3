import express from 'express'
import handleFundApi from '../../controllers/api/fundraiserController.js'
const router = express.Router()

router.get('/fundraiser', handleFundApi);

export default router;