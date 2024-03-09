import api from "../configs/request-config";
import { IResponse } from "../types/request";

export interface IToDoService {
  deleteToDo: (id: number) => IResponse<{ id: number }>;
}

const toDoService: IToDoService = {
  deleteToDo: (id: number): IResponse<{ id: number }> => {
    return api.delete<{ id: number }>(`/to-do/${id}`);
  },
};

export default toDoService;
