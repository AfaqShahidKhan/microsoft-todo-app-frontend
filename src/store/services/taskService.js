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

export async function fetchAllTasks(page, priority, title) {
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
      : title
      ? (tasks = await apiRequest(`/users/${userId}/tasks?title=${title}`))
      : (tasks = await apiRequest(`/users/${userId}/tasks`));
    console.log(`urel ${priority}`);

    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
}

export async function fetchAllOverDueTasks() {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error("User ID is required.");
    }
    const tasks = await apiRequest(`/users/${userId}/tasks/overdue`);

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

export async function updateTaskData(taskId, taskData) {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error("User ID is required.");
    }

    taskData.user = userId;

    let task = await apiRequest(
      `/users/${userId}/tasks/${taskId}`,
      "PATCH",
      taskData
    );
    task = task.data.data;
    console.log("i am here and updated task is ", task);

    return { success: true, task };
  } catch (error) {
    console.error("Failed to reset password:", error);
    throw error;
  }
}
