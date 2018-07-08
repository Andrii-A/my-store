import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';

import * as _ from 'lodash';

import {filter} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

import {TaskType} from '../models/models';
import {UUID} from 'angular2-uuid';

@Injectable()
export class TasksListService {
  private API_URL = environment.apiUrl;
  private dataSubject: BehaviorSubject<any>;
  private statusSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.dataSubject = new BehaviorSubject<any>(null);
    this.statusSubject = new BehaviorSubject<any>(null);
  }

  dataStream$() {
    return this.dataSubject.asObservable().pipe(filter(x => !_.isNull(x)));
  }

  statusStream$() {
    return this.statusSubject.asObservable().pipe(filter(x => !_.isNull(x)));
  }


  getTasks() {
    this.statusSubject.next('busy');


    this.http
      .get(`${this.API_URL}/tasks`).subscribe(
      res => {
        this.dataSubject.next(res);
        this.statusSubject.next('ready');
      },
      err => {
        this.dataSubject.error(err);
        this.statusSubject.next('error');
      });
  }

  loadTasks(): Observable<any> {
    const url = `${this.API_URL}/tasks`;
    return this.http.get(url);
  }


  // deleteTask(task: TaskType) {
  //   const id: number = task.id;
  //   const url = `${this.API_URL}/tasks/${id}`;
  //
  //   const currentTasks = this.dataSubject.getValue();
  //   const updatedTasks = _.filter(currentTasks, (t: TaskType) => t.id !== id);
  //
  //   this.statusSubject.next('busy');
  //
  //   this.http
  //     .delete(url).subscribe(
  //     () => {
  //       this.dataSubject.next(updatedTasks);
  //       this.statusSubject.next('ready');
  //     },
  //     err => {
  //       console.error('can`t delete! >>>', err);
  //       this.statusSubject.next('error');
  //     });
  // }

  deleteTask(id: number): Observable<any> {
    const url = `${this.API_URL}/tasks/${id}`;
    return this.http.delete(url);
  }


  toggleTask(task: TaskType) {
    const updatedTask = Object.assign({}, task);
    updatedTask.completed = !task.completed;

    const url = `${this.API_URL}/tasks/${task.id}`;
    const currentTasks = this.dataSubject.getValue();

    const updatedTasks = _.map(currentTasks, (t: TaskType) => {
      if (t.id === task.id) {
        t = updatedTask;
      }
      return t;
    });

    this.statusSubject.next('busy');


    this.http
      .put(url, updatedTask).subscribe(
      res => {
        this.dataSubject.next(updatedTasks);
        this.statusSubject.next('ready');
      },
      err => {
        console.error('can`t toggle! >>>', err);
        this.statusSubject.next('error');
      });
  }

  addTask(name: string) {
    const newTask = {
      name: name || 'Do something!',
      id: UUID.UUID(),
      completed: false
    };

    const currentTasks = this.dataSubject.getValue();
    const updatedTasks = _.concat(currentTasks, newTask);

    this.statusSubject.next('busy');


    this.http
      .post(`${this.API_URL}/tasks/`, newTask).subscribe(
      res => {
        this.dataSubject.next(updatedTasks);
        this.statusSubject.next('ready');
      },
      err => {
        console.error('can`t add it! >>>', err);
        this.statusSubject.next('error');
      });
  }


}
