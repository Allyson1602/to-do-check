import api from "../configs/request-config";
import { IToDoItemModel } from "../models/todo-item";
import { IResponse } from "../types/request";

export interface IToDoBody {
  categoryId: number;
  title: string;
  description: string;
}

export interface IToDoBodyUpdate {
  id: number;
  title: string;
  description: string;
}

export interface IToDoService {
  deleteToDo: (id: number) => IResponse<{ id: number }>;
  updateToDo: (body: IToDoBodyUpdate) => IResponse<IToDoItemModel>;
  createToDo: (body: IToDoBody) => IResponse<IToDoItemModel>;
}

const toDoService: IToDoService = {
  deleteToDo: (id: number): IResponse<{ id: number }> => {
    return api.delete<{ id: number }>(`/to-do/${id}`);
  },

  updateToDo: (body: IToDoBodyUpdate): IResponse<IToDoItemModel> => {
    return api.put<IToDoItemModel>(`/to-do/${body.id}`, body);
  },

  createToDo: (body: IToDoBody): IResponse<IToDoItemModel> => {
    return api.post<IToDoItemModel>("/to-do", body);
  },
};

export default toDoService;
