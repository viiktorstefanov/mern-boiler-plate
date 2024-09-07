import axios from "axios";
import { User } from "../types/User";
axios.defaults.withCredentials = true;

const HOST = 'http://localhost:5000';

const endpoints = {
    register: '/api/auth/signup',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    verify: '/api/auth/verify-email',
    reset: '/api/auth/reset-password',
    forgot: '/api/auth/forgot-password',
    check: '/api/auth'
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

const logout = async () => await axios.post(`${HOST}${endpoints.logout}`);

const verifyEmail = async (code: string): Promise<{ data: { user: User, message: string, success: boolean } }> => await axios.post(`${HOST}${endpoints.verify}`, { code });

const forgotPassword = async (email: string) => await axios.post(`${HOST}${endpoints.forgot}`, { email });

const checkAuth = async (): Promise<{ data: { user: User, message: string, success: boolean } }> => await axios.get(`${HOST}${endpoints.check}`);

const resetPassword = async (token: string, password: string) => await axios.post(`${HOST}${endpoints.reset}/${token}`, password);

export {
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    checkAuth,
    resetPassword
}