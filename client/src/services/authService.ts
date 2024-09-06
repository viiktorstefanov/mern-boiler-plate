import axios from "axios";
import { User } from "../types/User";
axios.defaults.withCredentials = true;

const HOST = 'http://localhost:5000';

const endpoints = {
    register: '/api/auth/signup',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    verify: '/verify-email',
    reset: '/reset-password/:token',
    forgot: '/forgot-password'
};

type LoginData = {
    email: string,
    password: string,
};

type RegisterData = {
    email: string,
    password: string,
    username: string,
}

const login = async (data: LoginData): Promise<{ data: { user: User, message: string, success: boolean } }> => await axios.post(`${HOST}${endpoints.login}`, data);

const register = async (data: RegisterData): Promise<{ data: { user: User, message: string, success: boolean } }> => await axios.post(`${HOST}${endpoints.register}`, data);

const verifyEmail = async (code: string): Promise<{ data: { user: User, message: string, success: boolean } }> => await axios.post(`${HOST}${endpoints.verify}`, { code });

export {
    login,
    register,
    verifyEmail,
}