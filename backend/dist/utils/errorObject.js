class ErrorObject extends Error {
    constructor(statusCode = 500, status = 'error', message) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
    }
}
export default ErrorObject;
