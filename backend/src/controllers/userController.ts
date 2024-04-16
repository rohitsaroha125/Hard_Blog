import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";
import ErrorObject from "../utils/errorObject.js";

const prisma = new PrismaClient()

const signUpSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string()
  })

const userControllers = {
    signUp: async (req:Request, res: Response, next: NextFunction) => {
        try{
            const {name, email, password} = req.body
            const inputValidation = signUpSchema.safeParse({name, email, password})

            if (!inputValidation.success) {
                throw new ErrorObject(401, 'fail', 'Invalid Inputs')
            }

            const user = await prisma.user.create({
                data:{
                    name,
                    email,
                    password
                }
            })

            res.status(201).json({
                status:'ok',
                message:'User Registered Succesfully!',
                data:{
                    user
                }
            })

        }catch(err){
            next(err)
        }
    }
}

export default userControllers