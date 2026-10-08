import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant";
import Cookies from "js-cookie";

/**
 * Sets a cookie with a specified name, value, and optional expiration time.
 */
export const setCookie = ({
  cookieName,
  value,
}: {
  cookieName: string;
  value: string;
}) => {
  Cookies.set(cookieName, value, {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "Strict",
    // maxAge: 60 * 60 * 24,
  });
};

/**
 * Removes a specific cookie by name.
 */
export const removeCookie = (cookieName: string) => Cookies.remove(cookieName);

/**
 * Retrieves the value of a specific cookie by name.

 */
export const getCookie = (cookieName: string) => Cookies.get(cookieName);

/**
 * Clears all authentication-related cookies.
 * Currently removes 'accessToken' and 'refreshToken'.
 */
export const clearAllCookies = () => {
  removeCookie(ACCESS_TOKEN);
  removeCookie(REFRESH_TOKEN);
  localStorage.clear();
};
