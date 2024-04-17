import express from 'express'
import blogController from '../controllers/blogController.js' 
import { authMiddleware } from '../utils/authMiddleware.js'

const router = express.Router()

router.get('/bulk', authMiddleware, blogController.getBlogs)

router.get('/:id', authMiddleware, blogController.getBlog)

router.post('/', authMiddleware, blogController.createBlog)

router.put('/:id', authMiddleware, blogController.updateBlog)

export default router