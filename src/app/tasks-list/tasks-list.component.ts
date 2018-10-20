import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

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
  networkErr$: Observable<boolean>;

  newName: string;

  constructor(    private store: Store<AppState>  ) {
    this.tasks$ = this.store.select(state => state.tasks.taskList);
    this.loading$ = this.store.select(state => state.tasks.loading);
    this.loaded$ = this.store.select(state => state.tasks.loaded);
    this.networkErr$ = this.store.select(state => state.tasks.networkErr);
  }

  ngOnInit() {
    this.get();
  }

  get() {
    this.store.dispatch(new tasksActions.LoadTasksAction());
  }

  delete(task: TaskType) {
    this.store.dispatch(new tasksActions.DeleteTaskAction(task.id));
  }

  toggle(task: TaskType) {
    this.store.dispatch(new tasksActions.ToggleTaskAction(task));
  }

  add(name: string) {
    this.store.dispatch(new tasksActions.AddTaskAction(name));
    this.newName = '';
  }


}
