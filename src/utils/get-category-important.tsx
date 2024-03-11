import { useAppSelector } from "../hooks";

export const getCategoryImportant = () => {
  const categories = useAppSelector((state) => state.category);

  return categories.filter((category) => {
    const hasImportant = category.todoitems.some((todoItem) => {
      return todoItem.isimportant;
    });

    return hasImportant;
  });
};
