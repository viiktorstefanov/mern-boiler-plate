import express, { Request, Response } from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

// router.post('/login', authController.signUp);

// router.post('/logout', authController.signUp)

router.post('/signup', authController.signUp);

export default router;