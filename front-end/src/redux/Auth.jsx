import { createSlice } from "@reduxjs/toolkit";
import { loginStatus } from "../data/localStorages";

const loggedUser = loginStatus();
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginForm: false,
    register:false,
    user: {
      isLoggedIn: loggedUser ? true : false,
      username: loggedUser && loggedUser.username,
      user_role: loggedUser && loggedUser.role,
      user_id: loggedUser && loggedUser.user_id,
      email: loggedUser && loggedUser.email,
    },
  },
  reducers: {
    login: (state, action) => {
      state.user.username = action.payload.username;
      state.user.isLoggedIn = true;
      state.user.user_role = action.payload.role;
      state.user.user_id = action.payload.user_id;
      state.user.email = action.payload.email;
    },
    logout: (state, action) => {
      state.user.isLoggedIn = false;
      state.user.user_id = null;
      state.user.username = null;
      state.user.user_role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("rest");
      localStorage.removeItem("menu");
    },
    showLogin: (state) => {
      state.loginForm = !state.loginForm;
    },
    showRegisterForm :(state)=>{
      state.register = !state.register
    },

    updateToken: (state) => {},
  },
});

export const authActions = authSlice.actions;

export default authSlice;
