import { useAppSelector } from "../hooks";

export const getCategoryMetadata = () => {
  const categories = useAppSelector((state) => state.category);
  let todoQuantity = 0;
  let todoDone = 0;

  categories.forEach((categoryItem) => {
    todoQuantity += categoryItem.todoitems?.length || 0;

    const hasTodoDone = categoryItem.todoitems?.filter(
      (todoItem) => todoItem.isdone
    );
    todoDone += hasTodoDone?.length || 0;
  });

  return {
    categoryCreated: categories.length,
    todoCreated: todoQuantity,
    todoDone: todoDone,
  };
};
