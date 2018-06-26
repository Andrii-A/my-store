import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';

import {TaskModel} from '../models/models';



import {catchError} from 'rxjs/operators';

import {TaskModel} from '../models/models';
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
    let id: number = task.id;
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
}
