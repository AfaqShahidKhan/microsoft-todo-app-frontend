import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

const userCookie = Cookies.get("user");

const user = userCookie ? JSON.parse(userCookie) : null;
const id = user?.id || null;

export async function fetchAllTasks() {
  try {
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

export async function addNewTask(taskData) {
  try {
    const task = await apiRequest(`/users/${id}/tasks`, "POST", taskData);
    return { success: true, task };
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw error;
  }
}
