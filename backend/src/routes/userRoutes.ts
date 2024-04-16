import express from 'express'
import userControllers from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', userControllers.signUp)
router.post('/signin', userControllers.signIn)

export default router