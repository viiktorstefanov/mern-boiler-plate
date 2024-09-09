import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type AuthState = {
    user: User | null,
    isAuthenticated: boolean,
    isVerified: boolean,
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isVerified: false,
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
        setAuth: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isVerified = true;
        },
    }
});

export const { setUser, clearUser, setAuth } = authSlice.actions;
export default authSlice.reducer;