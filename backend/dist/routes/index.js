import express from 'express';
import userRoutes from './userRoutes.js';
import blogRoutes from './blogRoutes.js';
const router = express.Router();
router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
export default router;
