import express from 'express';
import blogController from '../controllers/blogController.js';
import { authMiddleware } from '../utils/authMiddleware.js';
const router = express.Router();
router.get('/', authMiddleware, blogController.getBlogs);
router.get('/:id', (req, res, next) => {
    res.send('Hello World');
});
router.post('/', (req, res, next) => {
    res.send('Hello World');
});
router.put('/', (req, res, next) => {
    res.send('Hello World');
});
export default router;
