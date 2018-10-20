import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';


import {Observable} from 'rxjs';
import {TaskType} from '../models/models';

@Injectable()
export class TasksListService {
  private API_URL = environment.apiUrl;


  constructor(private http: HttpClient) {
  }


  loadTasks(): Observable<any> {
    const url = `${this.API_URL}/tasks`;
    return this.http.get(url);
  }


  deleteTask(id: string): Observable<any> {
    const url = `${this.API_URL}/tasks/${id}`;
    return this.http.delete(url);
  }


  toggleTask(task: TaskType): Observable<any> {
    const url = `${this.API_URL}/tasks/${task.id}`;
    return this.http.put(url, task);
  }

  addTask(newTask: TaskType): Observable<any> {
    return this.http.post(`${this.API_URL}/tasks/`, newTask);
  }


}
