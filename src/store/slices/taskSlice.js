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
    }
  },
});

export const { setTasks, setTasksToMyDay, removeTaskFromMyDay } = taskSlice.actions;
export default taskSlice.reducer;
