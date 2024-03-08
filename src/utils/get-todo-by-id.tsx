import { useAppSelector } from "../hooks";

export const getToDoById = (id: number) => {
  const todo = useAppSelector((state) => state.todo);

  return todo.find((todo) => todo.id === id);
};
