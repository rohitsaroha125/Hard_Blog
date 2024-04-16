import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";
import ErrorObject from "../utils/errorObject.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const signUpSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string()
  })

const signInSchema = z.object({
    email: z.string(),
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

            const encyptedPassword = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data:{
                    name,
                    email,
                    password: encyptedPassword
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
    },
    signIn: async (req:Request, res: Response, next: NextFunction) => {
        try{
            const {email, password} = req.body
            const inputValidation = signInSchema.safeParse({email, password})

            if (!inputValidation.success) {
                throw new ErrorObject(401, 'fail', 'Invalid Inputs')
            }

            const user = await prisma.user.findUnique({
                where:{
                    email
                }
            })

            if (!user) {
                throw new ErrorObject(401, 'fail', 'Email Not Found')
            }

            const matchUser = await bcrypt.compare(password, user.password)

            if (!matchUser) {
                throw new ErrorObject(401, 'fail', 'Invalid Credentials')
            }

            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string)

            res.status(201).json({
                status:'ok',
                message:'User Login Succesfull!',
                data:{
                    user,
                    token
                }
            })

        }catch(err){
            next(err)
        }
    }
}

export default userControllers