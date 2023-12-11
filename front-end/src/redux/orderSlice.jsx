import { createSlice } from "@reduxjs/toolkit";
import { getAllOrder } from "../services/APIservice";
import { useEffect, useState } from "react";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    prevOrders: [],
  },
  reducers: {},
});

export const orderAction = orderSlice.actions;

export default orderSlice;
