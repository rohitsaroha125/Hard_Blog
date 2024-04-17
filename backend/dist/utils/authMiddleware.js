var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import ErrorObject from "./errorObject.js";
export function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (req.headers.authorization) {
                const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization.split(" ")[0];
                if (!token) {
                    throw new ErrorObject(401, 'fail', 'Invalid Token Detected');
                }
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (!decoded) {
                    throw new ErrorObject(401, 'fail', 'Invalid Token Detected');
                }
                req.userId = decoded.userId;
                next();
            }
            else {
                throw new ErrorObject(401, 'fail', 'Invalid Token Detected');
            }
        }
        catch (err) {
            next(err);
        }
    });
}
