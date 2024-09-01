import express, { Request, Response } from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/login', authController.signUp);

router.get('/logout', (req: Request, res: Response) => {
    res.send('log in')
});

router.get('/signup', (req: Request, res: Response) => {
    res.send('log in')
});

export default router;