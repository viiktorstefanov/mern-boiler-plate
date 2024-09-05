import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type AuthState = {
    user: User | null,
    isLoading: boolean,
    error: string | null,
    isAuthenticated: boolean,
    isCheckingAuth: boolean,
};

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isCheckingAuth: true,
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
        }
    }
});

export const { setUser, clearUser, setError, setIsLoading } = authSlice.actions;
export default authSlice.reducer;