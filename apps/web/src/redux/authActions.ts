import { AppDispatch } from "./store";
import { authService } from "../services/AuthService.ts";
import { login, logout, onBoardingStatus } from "./authSlice.ts";
import { onboardingService } from "../services/OnboardingService.ts";
import { OnboardingEntity } from "../utils/types.ts";

export const loginUser =
  (credentials: { email: string; password: string }) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await authService.login(credentials);

      if (!response.accessToken) {
        throw new Error("Invalid response from server");
      }

      dispatch(
        login({
          accessToken: response.accessToken,
          onboarded: response.onboarded,
        }),
      );
      localStorage.setItem("token", response.accessToken);
    } catch (error: unknown) {
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 401 || err.response?.status === 404) {
        throw new Error("Invalid email or password");
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  };

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(logout());
};

export const completeOnboarding =
  (credentials: OnboardingEntity, navigate: (path: string) => void) =>
  async (dispatch: AppDispatch) => {
    try {
      await onboardingService.onBoardingProcess(credentials);
      dispatch(onBoardingStatus(true));
      navigate("/home");
      console.log("Onboarding completed successfully navigate to /home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  };
