import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICategoryModel } from "../../models/category";
import { EIcon } from "../../enums/icon";

export interface CategoryState extends ICategoryModel {}

const initialState: CategoryState[] | null = [
  {
    id: 5,
    iconName: EIcon.building,
    isFavorite: true,
    title: "Criar - teste",
    todoItems: [
      {
        id: 5,
        description: "Coisas - teste",
        title: "Tarefas - teste",
        isImportant: true,
        isDone: false,
      },
      {
        id: 7,
        description: "Outras Coisas - teste",
        title: "Outras Tarefas - teste",
        isImportant: false,
        isDone: false,
      },
    ],
  },
  {
    id: 8,
    iconName: EIcon.hamburguer,
    isFavorite: false,
    title: "Outro - teste",
    todoItems: [
      {
        id: 5,
        description: "Mais Coisas - teste",
        title: "Mais Tarefas - teste",
        isImportant: true,
        isDone: false,
      },
      {
        id: 7,
        description: "Mais Outras Coisas - teste",
        title: "Mais Outras Tarefas - teste",
        isImportant: true,
        isDone: false,
      },
    ],
  },
];

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryState>) => {
      state = [...state, action.payload];
    },
  },
});

export const { setCategory } = categorySlice.actions;

export const selectCount = (state: RootState) => state.category;

export default categorySlice.reducer;
