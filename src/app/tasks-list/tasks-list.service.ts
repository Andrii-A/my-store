import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../environments/environment';

import * as _ from 'lodash';

import {filter} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

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
    // return this.subject.asObservable();
    return this.subject.asObservable().pipe(filter(x => !_.isNull(x)));

  }


  getTasks() {
    this.http
      .get(`${this.API_URL}/tasks`).subscribe(
      res => {
        this.subject.next(res);
      },
      err => {
        this.subject.error(err);
      });
  }

  deleteTask(task: TaskType) {
    const id: number = task.id;
    const url = `${this.API_URL}/tasks/${id}`;

    const currentTasks = this.subject.getValue();
    const updatedTasks = _.remove(currentTasks, (t: TaskType) => t.id !== id);

    return this.http
      .delete(url).subscribe(
        () => {
          this.subject.next(updatedTasks);
        },
        err => {
          console.error('can`t delete! >>>', err);
        });
  }


  toggleTask(task: TaskType) {
    const updatedTask = Object.assign({}, task);
    updatedTask.completed = !task.completed;

    const url = `${this.API_URL}/tasks/${task.id}`;
    const currentTasks = this.subject.getValue();

    const updatedTasks = _.map(currentTasks, (t: TaskType) => {
      if (t.id === task.id) {
        t.completed = !t.completed;
      }
      return t;
    });

    return this.http
      .put(url, updatedTask).subscribe(
        res => {
          this.subject.next(updatedTasks);
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

    const currentTasks = this.subject.getValue();
    const updatedTasks = _.concat(currentTasks, newTask);

    this.http
      .post(`${this.API_URL}/tasks/`, newTask).subscribe(
      res => {
        this.subject.next(updatedTasks);
      },
      err => {
        console.error('can`t add it! >>>', err);
      });
  }


}
