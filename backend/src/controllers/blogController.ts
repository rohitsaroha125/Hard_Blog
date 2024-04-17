import { Request, Response, NextFunction } from "express";

interface NewRequest extends Request{
    userId?: string
}

const blogController = {
    getBlogs: async (req: NewRequest, res: Response, next: NextFunction) => {
        res.send('Hello Blog')
    }
}

export default blogController