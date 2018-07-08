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
  tasks: Array<TaskType>;
  tasks$: Observable<Array<TaskType>>;


  newName: string;
  loading: boolean;
  networkError: boolean;

  constructor(
    // private tasksListService: TasksListService
    private store: Store<AppState>
  ) {
    this.tasks$ = this.store.select(state => state.tasks);
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
    this.store.dispatch(new tasksActions.LoadTasksAction() );
  }

  delete(task: TaskType) {
    // this.tasksListService.deleteTask(task);
    this.store.dispatch(new tasksActions.DeleteTaskAction(task.id) );
  }

  toggle(task: TaskType) {
    // this.tasksListService.toggleTask(task);
  }

  add(name: string) {
    // this.tasksListService.addTask(name);
  }


}
