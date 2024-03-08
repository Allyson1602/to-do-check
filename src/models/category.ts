import { EIcon } from "../enums/icon";

export interface ICategoryModel {
  id: number;
  iconName: EIcon;
  isFavorite: boolean;
  title: string;
}
