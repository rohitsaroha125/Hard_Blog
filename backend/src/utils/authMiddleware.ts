import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import ErrorObject from "./errorObject.js";

interface NewRequest extends Request{
    userId?: string
}

export async function authMiddleware(req: NewRequest, res: Response, next: NextFunction){
    try{
        if (req.headers.authorization) {
            const token = req?.headers?.authorization.split(" ")[1]

            if (!token) {
                throw new ErrorObject(401, 'fail', 'Invalid Token Detected')
            }

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)

            if (!decoded) {
                throw new ErrorObject(401, 'fail', 'Invalid Token Detected')
            }

            req.userId = decoded.userId
            next()
        } else {
            throw new ErrorObject(401, 'fail', 'Invalid Token Detected')
        }
    }catch(err){
        next(err)
    }
}