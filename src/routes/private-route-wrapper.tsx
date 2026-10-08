// import { ACCESS_TOKEN } from "@/constant"
// import { getCookie } from "@/utils"
import { PATH } from "@/constant/path"
import React from "react"
import { Navigate } from "react-router-dom"

/**
 * A wrapper component for protecting private routes.
 * It checks if the user is authenticated (based on the presence of an access token in cookies).
 * If not authenticated, the user is redirected to the login page.
 * If authenticated and the user is on the root path `/`,
 * they are redirected to the dashboard.
 */
const PrivateRouteWrapper = ({ children }: { children?: React.ReactNode }) => {
  // Check if the access token exists in cookies to determine if the user is logged in
  // const isLoggedIn = !!getCookie(ACCESS_TOKEN)
  const isLoggedIn = true

  // If user is not logged in, navigate to the login page
  if (!isLoggedIn) {
    return <Navigate to={PATH.auth.login} />
  }

  // If user is logged in and tries to access root `/`, redirect them to dashboard
  if (window.location.pathname === "/") {
    window.location.replace(PATH.dashboard.dashboard)
  }

  // Render children (protected content) if authenticated
  return <>{children}</>
}

export default PrivateRouteWrapper
