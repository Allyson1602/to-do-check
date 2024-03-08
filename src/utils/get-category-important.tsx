import { useAppSelector } from "../hooks";

export const getCategoryImportant = () => {
  const categories = useAppSelector((state) => state.category);

  return categories.filter((category) => {
    const hasImportant = category.todoItems.some((todoItem) => {
      return todoItem.isImportant;
    });

    return hasImportant;
  });
};
