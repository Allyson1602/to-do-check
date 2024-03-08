import api from "../configs/request-config";
import { ICategoryModel } from "../models/category";
import { IResponse } from "../types/request";

export interface ICategoryService {
  createCategory: (body: ICategoryModel) => IResponse<ICategoryModel>;
}

const categoryService: ICategoryService = {
  createCategory: (body: ICategoryModel): IResponse<ICategoryModel> => {
    return api.post<ICategoryModel>("/category", body);
  },
};

export default categoryService;
