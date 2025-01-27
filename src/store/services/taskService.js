import { apiRequest } from "@/utils/api";
import { cookies } from "next/headers";

export async function fetchAllTasks() {
  try {
    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    const id = userCookie?.value || null;

    if (!id) {
      throw new Error("User id is missing in cookies.");
    }

    const tasks = await apiRequest(`/users/${id}/tasks`);
    console.log(tasks);

    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
}
