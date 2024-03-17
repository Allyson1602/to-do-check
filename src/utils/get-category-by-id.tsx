import { useAppSelector } from "../hooks";

export const getCategoryById = (id: number) => {
  const categories = useAppSelector((state) => state.category);

  return categories.find((categories) => categories.id === id);
};
