import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NavState = {
  isMobile: boolean | null;
  isLoading: boolean;
  error: string | null;
  showMobileMenu: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: NavState = {
  isMobile: null,
  isLoading: false,
  error: null,
  showMobileMenu: false,
  status: "idle",
};

const appSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setStatus: (
      state,
      action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">
    ) => {
      state.status = action.payload;
    },
    setShowMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.showMobileMenu = action.payload;
    },
    onMobileMenuClick: (state) => {
      state.showMobileMenu = !state.showMobileMenu;
    },
  },
});

export const { setIsMobile, setIsLoading, setError, clearError, setStatus, setShowMobileMenu, onMobileMenuClick } =
  appSlice.actions;
export default appSlice.reducer;
