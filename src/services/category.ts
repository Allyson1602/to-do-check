import { AxiosResponse } from "axios";
import api from "../configs/request-config";
import { EIcon } from "../enums/icon";
import { ICategoryModel } from "../models/category";
import { IResponse } from "../types/request";

export interface ICategoryBody {
  iconName: EIcon;
  title: string;
}

export interface ICategoryService {
  createCategory: (body: ICategoryBody) => IResponse<ICategoryModel>;
}

const categoryService: ICategoryService = {
  createCategory: (body: ICategoryBody): IResponse<ICategoryModel> => {
    return api.post<ICategoryModel>("/category", body);
  },
};

export default categoryService;
