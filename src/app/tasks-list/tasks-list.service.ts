import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';

import {TaskModel} from '../models/models';
import { UUID } from 'angular2-uuid';


// import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class TasksListService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }


  getTasks(): Observable<Array<TaskModel>> {
    return this.http
      .get<Array<TaskModel>>(`${this.API_URL}/tasks`)
      // .pipe(catchError((error: any) => Observable.throw(error)))
      ;
  }

  deleteTask(task: TaskModel): Observable<Array<TaskModel>> {
    const id: number = task.id;

    return this.http
      .delete<Array<TaskModel>>(`${this.API_URL}/tasks/${id}`)
      // .pipe(catchError((error: any) => Observable.throw(error)))
      ;
  }


  toggleTask(task: TaskModel): Observable<Array<TaskModel>> {
    const id = task.id;

    const updatedTask = task;
    updatedTask.completed = !task.completed;

    return this.http
      .put<Array<TaskModel>>(`${this.API_URL}/tasks/${id}`, updatedTask)
      // .pipe(catchError((error: any) => Observable.throw(error)))
      ;
  }

  addTask(name: string): Observable<Array<TaskModel>> {
    const newTask = {
      name: name || 'Do something!',
      id: UUID.UUID(),
      completed: false
    };

    return this.http
      .post<Array<TaskModel>>(`${this.API_URL}/tasks/`, newTask)
      // .pipe(catchError((error: any) => Observable.throw(error)))
      ;
  }


}
