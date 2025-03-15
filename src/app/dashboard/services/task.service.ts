import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { responseTask } from '@app/core/interfaces/responde-task';
import { EstadoTask, Task } from '../interfaces/task';

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
  updateTaskStatus(id: number, state: EstadoTask): Observable<any> {
    const url = `${this.apiUrl}/${id}/complete`;
    const body = { state };
    return this.http.patch(url, body);
  }
  filterByState(state: EstadoTask): Observable<Task[]> {
    const params = new HttpParams().set('State', state);

    return this.http.get<any[]>(`${this.apiUrl}/by-status`, { params });
  }


}
