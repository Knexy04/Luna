import jwt from 'jsonwebtoken';
import UserSchema from "../models/user.js";

export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decodeUser = jwt.verify(token, process.env.JWT_KEY);
            const checkUser = await UserSchema.findById(decodeUser)
            req.userId = checkUser && decodeUser._id
        } catch (e) {
            try {
                const decodeAdmin = jwt.verify(token, process.env.JWT_ADMIN_KEY);
                const checkAdmin = await UserSchema.findById(decodeAdmin)
                req.userId = checkAdmin && decodeAdmin._id
            } catch (e) {
                return res.status(403).json({
                    message: 'Нет доступа',
                });
            }
        }

        next();

    } else {
        return res.status(403).json({
            message: "Нет доступа",
        })
    }

}