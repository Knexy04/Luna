import jwt from 'jsonwebtoken';
import UserSchema from "../models/user.js";

export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_ADMIN_KEY);

            const admin = await UserSchema.findById(decode._id)

            if(admin.role !== "Admin") {
                return res.status(403).json({
                    message: 'Нет доступа',
                });
            }

            req.userId = decode._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        return res.status(403).json({
            message: "Нет доступа",
        })
    }

}