// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios"
// // import createAuthRefreshInterceptor from "axios-auth-refresh"
// import { BASE_URL } from "../utils/base-url"
// // import { PATH } from "@/constant/path"
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant"
// import { END_POINT } from "@/constant/end-point"
// import { clearAllCookies, getCookie, setCookie } from "@/utils"

// // Create an Axios instance with base URL and default headers
// const axiosInstance = axios.create({
//   baseURL: `${BASE_URL}/api/v1`,
//   headers: {
//     accept: "application/json",
//   },
// })

// // Add a request interceptor to attach the access token to every request
// axiosInstance.interceptors.request.use(
//   function (config) {
//     const accessToken = getCookie(ACCESS_TOKEN)

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`
//     }

//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// /**
//  * Logic to handle token refresh when access token expires
//  * @param failedRequest - The original request that failed due to 401
//  */
// const refreshTokenLogic = async (failedRequest: any) => {
//   const refreshToken = getCookie(REFRESH_TOKEN)

//   // If refresh token is missing, clear cookies and redirect to login
//   // if (!refreshToken) {
//   //   clearAllCookies()
//   //   window.location.href = PATH.auth.login
//   //   return Promise.reject("Refresh token missing")
//   // }

//   try {
//     // Call refresh token endpoint
//     const res = await axios.post(`${BASE_URL}${END_POINT.AUTH.REFRESH_TOKEN}`, {
//       refreshToken,
//     })

//     const data = res.data ?? {}
//     const { access: newAccessToken } = data

//     // Update access token in cookies
//     setCookie({
//       cookieName: ACCESS_TOKEN,
//       value: newAccessToken,
//     })

//     // Retry the failed request with new token
//     // failedRequest.response.config.headers.Authorization = `Bearer ${newAccessToken}`

//     return Promise.resolve()
//   } catch (error) {
//     // If refresh fails, clear cookies and redirect to login
//     clearAllCookies()
//     // window.location.href = PATH.auth.login
//     // return Promise.reject(error)
//   }
// }

// // Add interceptor to automatically handle 401 responses and refresh token
// // createAuthRefreshInterceptor(axiosInstance, refreshTokenLogic, {
// //   shouldRefresh: (error: any) => {
// //     return (
// //       error?.response?.status === 401 &&
// //       !error.config.__isRetryRequest &&
// //       !error.config?.url?.includes("/auth/token/refresh")
// //     )
// //   },
// // })

// export default axiosInstance
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
// import createAuthRefreshInterceptor from "axios-auth-refresh"
import { BASE_URL } from "../utils/base-url"
// import { PATH } from "@/constant/path"
import { ACCESS_TOKEN } from "@/constant"

import { getCookie } from "@/utils"

// Create an Axios instance with base URL and default headers
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    accept: "application/json",
  },
})

// Add a request interceptor to attach the access token to every request
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie(ACCESS_TOKEN)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

/**
 * Logic to handle token refresh when access token expires
 * @param failedRequest - The original request that failed due to 401
 */

// Add interceptor to automatically handle 401 responses and refresh token
// createAuthRefreshInterceptor(axiosInstance, refreshTokenLogic, {
//   shouldRefresh: (error: any) => {
//     return (
//       error?.response?.status === 401 &&
//       !error.config.__isRetryRequest &&
//       !error.config?.url?.includes("/auth/token/refresh")
//     )
//   },
// })

export default axiosInstance
