import { EIcon } from "../enums/icon";
import { IToDoItemModel } from "./todo-item";

export interface ICategoryModel {
  id: number;
  iconname: EIcon;
  isfavorite: boolean;
  title: string;
  todoitems: IToDoItemModel[];
}
