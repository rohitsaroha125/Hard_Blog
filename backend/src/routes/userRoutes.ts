import express from 'express'
import userControllers from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', userControllers.signUp)

router.post('/signin', (req, res, next) => {
    res.send('Hello World')
})

export default router