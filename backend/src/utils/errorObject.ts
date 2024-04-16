class ErrorObject extends Error{
    statusCode: number
    status: string

    constructor(statusCode: number=500, status: string='error', message: string) {
        super(message)
        this.statusCode = statusCode
        this.status = status
    }
}

export default ErrorObject