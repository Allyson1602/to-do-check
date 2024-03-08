import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../reducers/todo";
import categoryReducer from "../reducers/category";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
