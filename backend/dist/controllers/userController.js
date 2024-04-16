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
const prisma = new PrismaClient();
const signUpSchema = z.object({
    email: z.string(),
    name: z.string(),
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
            const user = yield prisma.user.create({
                data: {
                    name,
                    email,
                    password
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
    })
};
export default userControllers;
