import { EIcon } from "../enums/icon";
import { IToDoItemModel } from "./todo-item";

export interface ICategoryModel {
  id: number;
  iconName: EIcon;
  isFavorite: boolean;
  title: string;
  todoItems: IToDoItemModel[];
}
