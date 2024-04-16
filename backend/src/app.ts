import express from 'express'
import apiRoutes from './routes/index.js'
import { Request, Response, NextFunction } from 'express'
import 'dotenv/config'

const port = process.env.PORT || 5000

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/v1', apiRoutes)
app.use('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'No API Route found'
    })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const status = err.status || 'error'
    const message = err.message || 'Error Occured'

    if (process.env.NODE_ENV==="production") {
        res.status(statusCode).json({
            status,
            message
        })
    } else {
        res.status(statusCode).json({
            status,
            message,
            error: err.stack
        })
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})