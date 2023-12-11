import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { actions } from "./cartSlice";
import { getRestuarantById } from "../services/APIservice";
import axios from "axios";
import { getRestuarant } from "../data/localStorages";

const restuarantSlice = createSlice({
  name: "rest",
  initialState: {
    details: false,
    restDetail: false,
    getRestDetail: null,
    managerForm: false,
    restuarantForm: false,
    foodForm: false,
    categoryForm: false,
    restMenu: false,
    showOrders: false,
    restId: null,
    dashboard: {
      show: true,
      data: null,
    },
    newData: null,
  },
  reducers: {
    getAll: (state, actions) => {},
    showForm: (state) => {
      state.isShow = !state.isShow;
    },
    showRestDetail: (state) => {
      state.restDetail = !state.restDetail;
    },

    getDetailOfRestaurant: (state, action) => {
      const rest = getRestuarantById(action.payload).then(
        (response) => response
      );

      console.log(rest);
    },

    showRestuarantForm: (state) => {
      state.restuarantForm = !state.restuarantForm;
    },
    showManagerForm: (state) => {
      state.managerForm = !state.managerForm;
    },

    showFoodForm: (state, action) => {
      // console.log(action.payload)
      state.foodForm = !state.foodForm;
      state.restId = action.payload;
    },

    handleCategoryForm: (state) => {
      state.categoryForm = !state.categoryForm;
    },
    handleDetails: (state, action) => {
      state.details = !state.details;
      state.data = action.payload;
    },

    viewMenu: (state, action) => {
      state.restMenu = action.payload;
      state.dashboard.show = false;
      state.showOrders = false;
    },

    handleDashboard: (state, action) => {
      state.dashboard.show = action.payload;
      state.restMenu = false;
      state.showOrders = false;
    },

    handleShowOrders: (state, action) => {
      state.showOrders = action.payload;
      state.dashboard.show = false;
      state.restMenu = false;
    },
  },
});

export const restActions = restuarantSlice.actions;

export default restuarantSlice;
