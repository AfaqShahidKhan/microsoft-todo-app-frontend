const { createSlice } = require("@reduxjs/toolkit");
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token") || null,
  user: Cookies.get("user") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },

    logout: (state, action) => {
      state.token = null;
      state.user = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
