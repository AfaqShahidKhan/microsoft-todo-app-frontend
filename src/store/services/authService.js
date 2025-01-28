import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

export async function signup(newUser) {
  try {
    const { token, data } = await apiRequest("/users/signup", "POST", newUser);
    const { user } = data;

    Cookies.set("token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "development",
    });

    Cookies.set("user", JSON.stringify(user), { expires: 7 });

    return { success: true, user };
  } catch (error) {
    console.error("Failed to sign up:", error);
    throw error;
  }
}

export async function login(existingUser) {
  try {
    const { token, data } = await apiRequest(
      "/users/login",
      "POST",
      existingUser
    );
    const { user } = data;

    Cookies.set("token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "development",
    });

    Cookies.set("user", JSON.stringify(user), { expires: 7 });

    return { success: true, user };
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
}

export async function sendResetPasswordEmail(userData) {
  try {
    await apiRequest("/users/forgotPassword", "POST", userData);

    return { success: true };
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
}

export async function resetUserPassword(token, userData) {
  try {
    await apiRequest(`/users/resetPassword/${token}`, "PATCH", userData);

    return { success: true };
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw error;
  }
}
