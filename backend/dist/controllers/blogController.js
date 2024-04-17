var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import ErrorObject from "../utils/errorObject.js";
const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    published: z.string()
});
const prisma = new PrismaClient();
const blogController = {
    getBlogs: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blogs = yield prisma.post.findMany();
            res.status(200).json({
                status: 'ok',
                data: {
                    blogs
                }
            });
        }
        catch (err) {
            next(err);
        }
    }),
    getBlog: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const blog = yield prisma.post.findUnique({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json({
                status: 'ok',
                data: {
                    blog
                }
            });
        }
        catch (err) {
        }
    }),
    createBlog: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, content, published } = req.body;
            const inputValidation = blogSchema.safeParse({ title, content, published });
            if (!inputValidation.success) {
                throw new ErrorObject(401, 'fail', 'Invalid Inputs');
            }
            const createdBlog = yield prisma.post.create({
                data: {
                    userId: req.userId,
                    title,
                    content,
                    published: Boolean(published)
                }
            });
            res.status(201).json({
                status: 'ok',
                data: {
                    blog: createdBlog
                }
            });
        }
        catch (err) {
            next(err);
        }
    }),
    updateBlog: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, content, published } = req.body;
            const inputValidation = blogSchema.safeParse({ title, content, published });
            if (!inputValidation.success) {
                throw new ErrorObject(401, 'fail', 'Invalid Inputs');
            }
            const findBlog = yield prisma.post.findUnique({
                where: {
                    id: req.params.id
                }
            });
            if ((findBlog === null || findBlog === void 0 ? void 0 : findBlog.userId) !== req.userId) {
                throw new ErrorObject(401, 'fail', 'This blog is not written by you');
            }
            const updatedBlog = yield prisma.post.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    title,
                    content,
                    published: Boolean(published)
                }
            });
            res.status(201).json({
                status: 'ok',
                data: {
                    blog: updatedBlog
                }
            });
        }
        catch (err) {
            next(err);
        }
    })
};
export default blogController;
