const { configureStore } = require("@reduxjs/toolkit");

import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export default store;