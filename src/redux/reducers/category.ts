import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICategoryModel } from "../../models/category";
import { EIcon } from "../../enums/icon";

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
  },
});

export const { setCategory, updateCategory, setInitCategories } =
  categorySlice.actions;

export const selectCount = (state: RootState) => state.category;

export default categorySlice.reducer;
