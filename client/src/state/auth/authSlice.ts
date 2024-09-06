import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type AuthState = {
    user: User | null,
    isLoading: boolean,
    error: string | null,
    isAuthenticated: boolean,
    isVerified: boolean,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
};

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isVerified: false,
    status: 'idle'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        setAuth: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isVerified = true;
        },
        setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
            state.status = action.payload;
        },
    }
});

export const { setUser, clearUser, setError, setIsLoading, setAuth, setStatus } = authSlice.actions;
export default authSlice.reducer;