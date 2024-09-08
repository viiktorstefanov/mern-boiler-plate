
import axios from "axios";
import { useDispatch } from "react-redux";

import { setError, setStatus, setUser } from "../state/auth/authSlice";

import { checkAuth } from "../services/authService";

const useAuthCheck = () => {
    const dispatch = useDispatch();
  
    const checkAuthentication = async () => {
      try {
        dispatch(setStatus('loading'));
        const response = await checkAuth();
        const user = response.data.user;
        dispatch(setUser(user));
      } catch (error: unknown) {
        dispatch(setStatus('failed'));
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response.data.message);
        } else {
          dispatch(setError('An unexpected error occurred'));
        }
      } finally {
        dispatch(setStatus('succeeded'));
      }
    };
  
    return checkAuthentication;  
  };
  
  export default useAuthCheck;