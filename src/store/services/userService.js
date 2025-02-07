import { apiRequest } from "@/utils/api";

export async function   updateUserData(userData) {
  try {
    let user = await apiRequest(`/users/updateMe`, "PATCH", userData);
    user = user.data.user;
    console.log("i am here and updated user is ", user);

    return { success: true, user };
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw error;
  }
}
