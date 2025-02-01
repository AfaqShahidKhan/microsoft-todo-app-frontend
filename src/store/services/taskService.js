import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

export const getUserId = () => {
  const userCookie = Cookies.get("user");
  if (!userCookie) {
    throw new Error("User not found in cookies");
  }
  const user = JSON.parse(userCookie);
  return user.id;
};

export async function fetchAllTasks(page, priority) {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error("User ID is required.");
    }
    let tasks;
    priority
      ? (tasks = await apiRequest(
          `/users/${userId}/tasks?priority=${priority}`
        ))
      : (tasks = await apiRequest(`/users/${userId}/tasks`));
    console.log(`urel ${priority}`);

    return tasks;
    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
}

export async function addNewTask(taskData) {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error("User ID is required.");
    }

    taskData.user = userId;

    let task = await apiRequest(`/users/${userId}/tasks`, "POST", taskData);
    task = task.data.data;
    return { success: true, task };
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw error;
  }
}
