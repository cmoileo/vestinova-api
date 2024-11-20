import jwtService from "../service/jwt.service";
import {NextFunction} from "express";

const authGuard = async (req: Request, res: any, next: NextFunction) => {
    // @ts-ignore
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }
    try {
        const decoded: object = await jwtService.verify(token);
        // @ts-ignore
        if (!decoded.valid) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        // @ts-ignore
        req.user = decoded.decoded;
    } catch (error) {
        return res.status(500).json({ message: 'Internal error' });
    }
    next();
}

export default authGuard;