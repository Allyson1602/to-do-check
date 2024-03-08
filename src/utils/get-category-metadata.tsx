import { useAppSelector } from "../hooks";

export const getCategoryMetadata = () => {
  const categories = useAppSelector((state) => state.category);
  let todoQuantity = 0;
  let todoDone = 0;

  categories.forEach((categoryItem) => {
    todoQuantity += categoryItem.todoItems.length;
  });

  categories.forEach((categoryItem) => {
    const hasTodoDone = categoryItem.todoItems.filter(
      (todoItem) => todoItem.isDone
    );
    todoDone += hasTodoDone.length;
  });

  return {
    categoryCreated: categories.length,
    todoCreated: todoQuantity,
    todoDone: todoDone,
  };
};
