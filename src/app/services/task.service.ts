import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private endpoint: string;

  constructor(private http: HttpClient, private router: Router) {
    this.endpoint = 'http://' + window.location.hostname + ':3000/api/list';
  }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/tasks`);
  }
  getTask(task: Task): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/task/${task._id}`);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/task`, task);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put<any>(`${this.endpoint}/task/${task._id}`, task);
  }

  deleteTask(task: Task): Observable<any> {
    console.log(task._id);
    
    return this.http.delete<any>(`${this.endpoint}/task/${task._id}`);
  }

  changeState(task: Task): Observable<any> {
    return this.http.put<any>(
      `${this.endpoint}/change_task_status/${task._id}`,
      {}
    );
  }
}
