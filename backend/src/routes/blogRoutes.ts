import express from 'express'

const router = express.Router()

router.get('/bulk', (req, res, next) => {
    res.send('Hello World')
})

router.get('/:id', (req, res, next) => {
    res.send('Hello World')
})

router.post('/', (req, res, next) => {
    res.send('Hello World')
})

router.put('/', (req, res, next) => {
    res.send('Hello World')
})

export default router