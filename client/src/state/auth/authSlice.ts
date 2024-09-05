import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type AuthState = {
    user: User | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    isAuthenticated: boolean,
};

const initialState: AuthState = {
    user: null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser() {

        },
        clearUser() {

        }
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;