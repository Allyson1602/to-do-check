import { EIcon } from "../enums/icon";
import { ITodoItemModel } from "./todo-item";

export interface ICategoryModel {
  id: number;
  iconName: EIcon;
  isFavorite: boolean;
  title: string;
  todoItems: ITodoItemModel[];
}
