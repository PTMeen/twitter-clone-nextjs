import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const naigationDrawerSlice = createSlice({
  name: "navigationDrawer",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { onClose, onOpen, toggleDrawer } = naigationDrawerSlice.actions;
export default naigationDrawerSlice.reducer;
