import express from 'express';
import authController from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/verifyToken';

const router = express.Router();

router.get('/', verifyToken, authController.checkAuth);

router.post('/login', authController.signIn);

router.post('/logout', authController.logout)

router.post('/signup', authController.signUp);

router.post("/verify-email", authController.verifyEmail);

router.post("/reset-password/:token", authController.resetPassword);

router.post("/forgot-password", authController.forgotPassword);

export default router;