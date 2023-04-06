import { createSlice } from "@reduxjs/toolkit";

const registerModalSlice = createSlice({
  name: "registerModal",
  initialState: { isOpen: false },
  reducers: {
    onClose: (state) => {
      state.isOpen = false;
    },
    onOpen: (state) => {
      state.isOpen = true;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { onClose, onOpen, toggleModal } = registerModalSlice.actions;
export default registerModalSlice.reducer;
