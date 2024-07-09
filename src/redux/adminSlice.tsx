import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
};


const adminSlice = createSlice({
  name: "admin", 
  initialState,
  reducers: {
    loginAsAdmin: (state) => {
      state.isAdmin = true;
    },
    signOutAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { loginAsAdmin, signOutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
