import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICategoryModel } from "../../models/category";

export interface CategoryState extends ICategoryModel {}

const initialState: CategoryState[] = [];

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryState>) => {
      state = [...state, action.payload];

      return state;
    },
    setInitCategories: (state, action: PayloadAction<CategoryState[]>) => {
      state = action.payload;

      return state;
    },
    updateCategory: (state, action: PayloadAction<CategoryState>) => {
      state = state.map((stateItem) => {
        if (stateItem.id === action.payload.id) {
          return action.payload;
        }

        return stateItem;
      });

      return state;
    },
    deleteCategory: (state, action: PayloadAction<{ id: number }>) => {
      state = state.filter((stateItem) => {
        return stateItem.id !== action.payload.id;
      });

      return state;
    },
  },
});

export const {
  setCategory,
  updateCategory,
  setInitCategories,
  deleteCategory,
} = categorySlice.actions;

export const selectCount = (state: RootState) => state.category;

export default categorySlice.reducer;
