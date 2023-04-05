import { configureStore } from "@reduxjs/toolkit";

import navigationDrawerReducer from "./features/navigationModalSlice";

export const store = configureStore({
  reducer: {
    navigationDrawer: navigationDrawerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
