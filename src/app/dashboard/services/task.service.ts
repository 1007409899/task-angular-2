import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { responseTask } from '@app/core/interfaces/responde-task';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/api/Tasks`;

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  saveTask(task: Task): Observable<responseTask<Task>> {
    return this.http.post<responseTask<Task>>(this.apiUrl, task);
  }
  updateTask(task: Task): Observable<responseTask<Task>> {
    return this.http.put<responseTask<Task>>(`${this.apiUrl}/${task.id}`, task);
  }
  deleteTask(id: number): Observable<responseTask<Task>> {
    return this.http.delete<responseTask<Task>>(`${this.apiUrl}/${id}`);
  }

  /* deleteTodo(id: string): Observable<ResponseTask> {
    return this.http.delete<ResponseTask>(`${this.apiUrl}/${id}`);
  }

  updateTodo(id: number, todo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, todo);
  }

  createTodo(todo: ResponseTask): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  } */
}
