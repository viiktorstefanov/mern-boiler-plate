import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { Navigate } from "react-router-dom";
import { clearUser, setError, setIsLoading } from "../../state/auth/authSlice";
import { logout } from "../../services/authService";
import axios from "axios";
import notification from "../../services/notification";

const Logout: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const onLogout = async () => {
      if (user) {
        try {
          dispatch(setIsLoading(true));
          await logout();
          dispatch(clearUser());
          notification.success('Logout successful');
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
            dispatch(setError(error.response.data.message));
          } else {
            dispatch(setError("An unexpected error occurred"));
          }
        } finally {
          dispatch(setIsLoading(false));
        }
      }
    };

    onLogout();
  }, [user, dispatch]);

  return <Navigate to="/" />;
};

export default Logout;
