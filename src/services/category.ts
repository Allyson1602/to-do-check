import api from "../configs/request-config";
import { EIcon } from "../enums/icon";
import { ICategoryModel } from "../models/category";
import { IResponse } from "../types/request";

export interface ICategoryBody {
  iconName: EIcon;
  title: string;
}

export interface ICategoryService {
  listCategories: () => IResponse<ICategoryModel[]>;
  createCategory: (body: ICategoryBody) => IResponse<ICategoryModel>;
  updateCategory: (body: ICategoryModel) => IResponse<ICategoryModel>;
  deleteCategory: (id: number) => IResponse<{ id: number }>;
}

const categoryService: ICategoryService = {
  listCategories: (): IResponse<ICategoryModel[]> => {
    return api.get<ICategoryModel[]>("/category");
  },

  createCategory: (body: ICategoryBody): IResponse<ICategoryModel> => {
    return api.post<ICategoryModel>("/category", body);
  },

  updateCategory: (body: ICategoryModel): IResponse<ICategoryModel> => {
    return api.put<ICategoryModel>(`/category/${body.id}`, body);
  },

  deleteCategory: (id: number): IResponse<{ id: number }> => {
    return api.delete<{ id: number }>(`/category/${id}`);
  },
};

export default categoryService;
