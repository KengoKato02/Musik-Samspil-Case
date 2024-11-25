import Login from "../../pages/unauthenticated/auth/Login";
import Register from "../../pages/unauthenticated/auth/Register";
import Home from "../../pages/authenticated/Home";
import Profile from "../../pages/authenticated/Profile";
import Onboarding from "../../pages/authenticated/OnBoarding";
export const routes = [
  {
    path: "/login",
    component: <Login />,
    protected: false,
  },
  {
    path: "/register",
    component: <Register />,
    protected: false,
  },
  {
    path: "/home",
    component: <Home />,
    protected: true,
  },
  {
    path: "/profile",
    component: <Profile />,
    protected: true,
  },
  {
    path: "/onboarding",
    component: <Onboarding />,
    protected: true,
  },
] as const;
