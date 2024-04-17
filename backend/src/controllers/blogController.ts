import { Request, Response, NextFunction } from "express";
import {z} from 'zod'
import { PrismaClient } from '@prisma/client'
import ErrorObject from "../utils/errorObject.js";

interface NewRequest extends Request{
    userId?: string
}

const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    published: z.string()
  })

  const prisma = new PrismaClient()

const blogController = {
    getBlogs: async (req: NewRequest, res: Response, next: NextFunction) => {
        try{
            const blogs = await prisma.post.findMany()

            res.status(200).json({
                status:'ok',
                data:{
                    blogs
                }
            })
        }catch(err){
            next(err)
        }
    },
    getBlog: async(req:NewRequest, res: Response, next: NextFunction) => {
        try{
            const blog = await prisma.post.findUnique({
                where:{
                    id: req.params.id
                }
            })

            res.status(200).json({
                status: 'ok',
                data:{
                    blog
                }
            })
        }catch(err){

        }
    },
    createBlog: async (req:NewRequest, res: Response, next: NextFunction) => {
        try{
            const {title, content, published} = req.body

            const inputValidation = blogSchema.safeParse({title, content, published})

            if (!inputValidation.success) {
                throw new ErrorObject(401, 'fail', 'Invalid Inputs')
            }

            const createdBlog = await prisma.post.create({
                data:{
                    userId: req.userId as string,
                    title,
                    content,
                    published: Boolean(published)
                }
            })

            res.status(201).json({
                status:'ok',
                data:{
                    blog: createdBlog
                }
            })

        }catch(err){
            next(err)
        }
    },
    updateBlog: async (req:NewRequest, res: Response, next: NextFunction) => {
        try{
            const {title, content, published} = req.body

            const inputValidation = blogSchema.safeParse({title, content, published})

            if (!inputValidation.success) {
                throw new ErrorObject(401, 'fail', 'Invalid Inputs')
            }

            const findBlog = await prisma.post.findUnique({
                where:{
                    id: req.params.id
                }
            })

            if (findBlog?.userId !== req.userId) {
                throw new ErrorObject(401, 'fail', 'This blog is not written by you')
            }

            const updatedBlog = await prisma.post.update({
                where: {
                    id: req.params.id,
                  },
                data:{
                    title,
                    content,
                    published: Boolean(published)
                }
            })

            res.status(201).json({
                status:'ok',
                data:{
                    blog: updatedBlog
                }
            })

        }catch(err){
            next(err)
        }
    }
}

export default blogController