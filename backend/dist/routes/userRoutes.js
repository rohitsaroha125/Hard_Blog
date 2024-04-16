import express from 'express';
const router = express.Router();
router.post('/signup', (req, res, next) => {
    res.send('Hello World');
});
router.post('/signin', (req, res, next) => {
    res.send('Hello World');
});
export default router;
