import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const loadMyDayTasks = () => {
  if (typeof window !== "undefined") {
    const savedTasks = Cookies.get("myDayTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  }
  return [];
};

const initialState = {
  tasks: [],
  myDayTasks: loadMyDayTasks(),
  assignToMeTasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setTasksToMyDay: (state, action) => {
      state.myDayTasks.push(action.payload);
    },
    setAssignToMeTasks: (state, action) => {
      state.assignToMeTasks = action.payload;
    },
    removeTaskFromMyDay: (state, action) => {
      state.myDayTasks = state.myDayTasks.filter(
        (task) => task._id !== action.payload
      );
    },
    updateTaskInStore: (state, action) => {
      const updatedTask = action.payload;

      const taskIndex = state.tasks.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }

      const myDayIndex = state.myDayTasks.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (myDayIndex !== -1) {
        state.myDayTasks[myDayIndex] = updatedTask;
      }

      const assignToMeIndex = state.assignToMeTasks.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (assignToMeIndex !== -1) {
        state.assignToMeTasks[assignToMeIndex] = updatedTask;
      }
    },
  },
});

export const {
  setTasks,
  setTasksToMyDay,
  setAssignToMeTasks,
  removeTaskFromMyDay,
  updateTaskInStore,
} = taskSlice.actions;
export default taskSlice.reducer;
