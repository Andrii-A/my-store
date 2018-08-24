import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {TasksListService} from './tasks-list.service';

import {TaskType, AppState} from '../models/models';

import * as tasksActions from './../actions/actions';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit {
  tasks$: Observable<Array<TaskType>>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  newName: string;
  networkError: boolean;

  constructor(
    // private tasksListService: TasksListService
    private store: Store<AppState>

  ) {

    this.tasks$ = this.store.select(state => state.tasks.taskList);
    this.loading$ = this.store.select(state => state.tasks.loading);
    this.loaded$ = this.store.select(state => state.tasks.loaded);

    // const taskStore = this.store.select(state => state.tasks);
    //
    // taskStore.subscribe(r => {
    //   console.log('r >>>', r);
    //
    // });

  }

  ngOnInit() {
    // this.tasksListService.getTasks();

    // this.tasksListService.dataStream$().subscribe(res => {
    //   this.tasks = res;
    //   this.newName = '';
    // });

    // this.tasksListService.statusStream$().subscribe(res => {
    //   switch (res) {
    //     case 'busy':
    //       this.loading = true;
    //       break;
    //     case 'ready':
    //       this.loading = false;
    //       break;
    //     case 'error':
    //       this.loading = true;
    //       this.networkError = true;
    //       break;
    //     default:
    //       this.loading = false;
    //   }
    //
    // });

    this.get();

  }

  get() {
    this.store.dispatch(new tasksActions.LoadTasksAction());
  }

  delete(task: TaskType) {
    // this.tasksListService.deleteTask(task);
    this.store.dispatch(new tasksActions.DeleteTaskAction(task.id));
  }

  toggle(task: TaskType) {
    // this.tasksListService.toggleTask(task);
    this.store.dispatch(new tasksActions.ToggleTaskAction(task));
  }

  add(name: string) {
    // this.tasksListService.addTask(name);
    this.store.dispatch(new tasksActions.AddTaskAction(name));
    this.newName = '';
  }


}
