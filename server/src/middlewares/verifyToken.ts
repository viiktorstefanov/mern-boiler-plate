import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export interface CustomRequest extends Request {
    userId?: string;
};

interface TokenPayload extends JwtPayload {
    userId: string;
};

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        req.userId = decoded.userId;
        next();
    } catch (error: any) {
        console.log("Error in verifyToken", error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired" });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        if (error.name === 'NotBeforeError') {
            return res.status(401).json({ success: false, message: "Token not active" });
        }

        return res.status(500).json({ success: false, message: "Server error" });
    }
};
