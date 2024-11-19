import { AppDispatch } from "./store";
import { authService } from "../services/AuthService.ts";
import { login, logout, setError } from "./authSlice.ts";

export const loginUser =
  (credentials: { email: string; password: string }) => async (dispatch: AppDispatch) => {
    try {
      const response = await authService.login(credentials);
      console.log("Response from authService.login:", response);
      if (response?.accessToken) {
        dispatch(login(response.accessToken));
        localStorage.setItem("token", response.accessToken);
      } else {
        dispatch(setError("invalid email or password"));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};
