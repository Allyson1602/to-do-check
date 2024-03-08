import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface TodoState {
  id: number;
  description: string;
  title: string;
  isImportant: boolean;
  isDone: boolean;
}

const initialState: TodoState[] | null = [
  {
    id: 5,
    description: "Coisas - teste",
    title: "Tarefas - teste",
    isImportant: true,
    isDone: false,
  },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<TodoState>) => {
      state = [...state, action.payload];
    },
  },
});

export const { setTodo } = todoSlice.actions;

export const selectCount = (state: RootState) => state.todo;

export default todoSlice.reducer;
