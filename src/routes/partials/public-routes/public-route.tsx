import { PATH } from "@/constant/path";
import Login from "@/pages/auth/login";
import ForgotPassword from "@/pages/auth/forgot-password";

export const publicRoutes = [
  { path: PATH.auth.login, element: <Login /> },
  { path: PATH.auth.forgotPassword, element: <ForgotPassword /> },
];
