import { configureStore } from "@reduxjs/toolkit";

import navigationDrawerReducer from "./features/navigationDrawerSlice";
import loginModalReducer from "./features/loginModalSlice";
import registerModalReducer from "./features/registerModalSlice";
import editProfileModalReducer from "./features/editProfileModalSlice";

export const store = configureStore({
  reducer: {
    navigationDrawer: navigationDrawerReducer,
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    editProfileModal: editProfileModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
