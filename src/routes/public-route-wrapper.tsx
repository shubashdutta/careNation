import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "@/constant/path";
import { ACCESS_TOKEN } from "@/constant";
import { getCookie } from "@/utils";

/**
 * A wrapper component for public routes (like login, signup pages).
 * If the user is already authenticated (access token exists in cookies),
 * they are redirected to the dashboard to prevent accessing public pages.
 * Otherwise, the public route content is rendered via <Outlet />.
 */
const PublicRouteWrapper = () => {
  // Check if the user is logged in by verifying the presence of an access token in cookies
  const isLoggedIn = !!getCookie(ACCESS_TOKEN);

  // If logged in, redirect to dashboard; otherwise render the public route's children
  return isLoggedIn ? <Navigate to={PATH.dashboard.dashboard} /> : <Outlet />;
};

export default PublicRouteWrapper;
