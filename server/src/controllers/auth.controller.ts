import { Request, Response } from "express";

const signUp = async (req: Request, res: Response) => {
    res.send('signup route')
}

export default {
    signUp
}