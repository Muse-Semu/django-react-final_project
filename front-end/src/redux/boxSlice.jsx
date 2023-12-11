import { createSlice } from "@reduxjs/toolkit";

const confirmBoxSlice = createSlice({
  name: "box",
  initialState: {
    show: false,
    isSuccessShow: false,
    error: false,
    errorMessage: "",
    successMessage: ""
  },
  reducers: {
    showBox: (state) => {
      state.show = !state.show;
    },

    showSuccess: (state,action) => {
      state.isSuccessShow = !state.isSuccessShow;
      state.successMessage = action.payload
    },

    showError: (state, action) => {
      state.error = !state.error;
      state.errorMessage = action.payload;
    },
  },
});

export const boxActions = confirmBoxSlice.actions;

export default confirmBoxSlice;
