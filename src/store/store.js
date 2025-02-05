import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
import Cookies from "js-cookie";

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const myDayTasksActions = [
    "task/setTasksToMyDay",
    "task/removeTaskFromMyDay",
    "task/updateTaskInStore",
  ];

  if (myDayTasksActions.includes(action.type)) {
    const { myDayTasks } = store.getState().task;
    if (typeof window !== "undefined") {
      Cookies.set("myDayTasks", JSON.stringify(myDayTasks), { expires: 1 });
    }
  }

  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
