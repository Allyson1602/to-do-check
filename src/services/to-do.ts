import api from "../configs/request-config";
import { IToDoItemModel } from "../models/todo-item";
import { IResponse } from "../types/request";

export interface IToDoBody {
  id: number;
  title: string;
  description: string;
}

export interface IToDoService {
  deleteToDo: (id: number) => IResponse<{ id: number }>;
  updateToDo: (body: IToDoBody) => IResponse<IToDoItemModel>;
}

const toDoService: IToDoService = {
  deleteToDo: (id: number): IResponse<{ id: number }> => {
    return api.delete<{ id: number }>(`/to-do/${id}`);
  },

  updateToDo: (body: IToDoBody): IResponse<IToDoItemModel> => {
    return api.put<IToDoItemModel>(`/to-do/${body.id}`, body);
  },
};

export default toDoService;
