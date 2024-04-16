var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
import { z } from "zod";
import ErrorObject from "../utils/errorObject.js";
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const signUpSchema = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string()
});
const signInSchema = z.object({
    email: z.string(),
    password: z.string()
});
const userControllers = {
    signUp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const inputValidation = signUpSchema.safeParse({ name, email, password });
            if (!inputValidation.success) {
                throw new ErrorObject(401, 'fail', 'Invalid Inputs');
            }
            const encyptedPassword = yield bcrypt.hash(password, 10);
            const user = yield prisma.user.create({
                data: {
                    name,
                    email,
                    password: encyptedPassword
                }
            });
            res.status(201).json({
                status: 'ok',
                message: 'User Registered Succesfully!',
                data: {
                    user
                }
            });
        }
        catch (err) {
            next(err);
        }
    }),
    signIn: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const inputValidation = signInSchema.safeParse({ email, password });
            if (!inputValidation.success) {
                throw new ErrorObject(401, 'fail', 'Invalid Inputs');
            }
            const user = yield prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (!user) {
                throw new ErrorObject(401, 'fail', 'Email Not Found');
            }
            const matchUser = yield bcrypt.compare(password, user.password);
            if (!matchUser) {
                throw new ErrorObject(401, 'fail', 'Invalid Credentials');
            }
            res.status(201).json({
                status: 'ok',
                message: 'User Login Succesfull!',
                data: {
                    user
                }
            });
        }
        catch (err) {
            next(err);
        }
    })
};
export default userControllers;
