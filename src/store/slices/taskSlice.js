import { createSlice } from "@reduxjs/toolkit";

const loadMyDayTasks = () => {
  if (typeof window !== "undefined") {
    const savedTasks = localStorage.getItem("myDayTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  }
  return [];
};

const initialState = {
  tasks: [],
  myDayTasks: loadMyDayTasks(),
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
    removeTaskFromMyDay: (state, action) => {
      state.myDayTasks = state.myDayTasks.filter(task => task._id !== action.payload);
    },
    updateTaskInStore: (state, action) => {
      const updatedTask = action.payload;
      
      const taskIndex = state.tasks.findIndex(task => task._id === updatedTask._id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
      
      const myDayIndex = state.myDayTasks.findIndex(task => task._id === updatedTask._id);
      if (myDayIndex !== -1) {
        state.myDayTasks[myDayIndex] = updatedTask;
      }
    }
  },
});

export const { setTasks, setTasksToMyDay, removeTaskFromMyDay, updateTaskInStore } = taskSlice.actions;
export default taskSlice.reducer;
