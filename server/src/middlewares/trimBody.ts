import { NextFunction, Request, Response } from "express";

export default () => (req: Request, res: Response, next: NextFunction) => {
    for(let key in req.body) {
        if(typeof req.body[key] == 'string') {
            req.body[key] = req.body[key].trim();
        }
    }
    next();
}