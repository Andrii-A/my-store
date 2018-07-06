import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';


import {from, combineLatest, BehaviorSubject} from 'rxjs';

import {TaskType} from '../models/models';
import {UUID} from 'angular2-uuid';



@Injectable()
export class TasksListService {
  private API_URL = environment.apiUrl;
  private subject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.subject = new BehaviorSubject<any>(null);
  }

  stream$() {
    return this.subject.asObservable();
  }


  getTasks() {
    this.http
      .get<Array<TaskType>>(`${this.API_URL}/tasks`).subscribe(
      res => {
        this.subject.next(res);
      },
      err => {
        this.subject.error(err);
      });
  }

  deleteTask(task: TaskType) {
    const id: number = task.id;

    return this.http
      .delete<Array<TaskType>>(`${this.API_URL}/tasks/${id}`).subscribe(
        res => {
          this.getTasks();
        },
        err => {
          console.error('can`t delete! >>>', err);
        });
  }


  toggleTask(task: TaskType) {
    const id = task.id;
    const updatedTask = task;
    updatedTask.completed = !task.completed;

    return this.http
      .put<Array<TaskType>>(`${this.API_URL}/tasks/${id}`, updatedTask).subscribe(
        res => {
          this.getTasks();
        },
        err => {
          console.error('can`t toggle! >>>', err);
        });
  }

  addTask(name: string) {
    const newTask = {
      name: name || 'Do something!',
      id: UUID.UUID(),
      completed: false
    };

    this.http
      .post<Array<TaskType>>(`${this.API_URL}/tasks/`, newTask).subscribe(
      res => {
        this.getTasks();
      },
      err => {
        console.error('can`t add it! >>>', err);
      });
  }


}
