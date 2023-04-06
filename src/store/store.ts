import { configureStore } from "@reduxjs/toolkit";

import navigationDrawerReducer from "./features/navigationDrawerSlice";
import loginModalReducer from "./features/loginModalSlice";
import registerModalReducer from "./features/registerModalSlice";

export const store = configureStore({
  reducer: {
    navigationDrawer: navigationDrawerReducer,
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
