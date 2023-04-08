import { createSlice } from "@reduxjs/toolkit";

const editProfileModalSlice = createSlice({
  name: "editProfileModal",
  initialState: { isOpen: false },
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { onClose, onOpen, toggleModal } = editProfileModalSlice.actions;
export default editProfileModalSlice.reducer;
