import { Task } from "../../dashboard/interfaces/task";

export interface responseTask<T> {
  message:string;
  data: T;
}