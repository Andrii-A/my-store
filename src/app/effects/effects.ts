import {Injectable} from '@angular/core';
import {TasksListService} from '../tasks-list/tasks-list.service';

import {Effect, Actions} from '@ngrx/effects';

import * as taskActions from './../actions/actions';

import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

import {UUID} from 'angular2-uuid';


@Injectable()
export class TaskEffects {

  constructor(
    private tasksListService: TasksListService,
    private actions$: Actions
  ) {
  }


  @Effect() loadTasks$ = this.actions$
    .ofType(taskActions.LOAD_TASKS)
    .pipe(
      switchMap(() => {
        return this.tasksListService.loadTasks()
          .pipe(
            map(taskList => new taskActions.LoadTasksSuccessAction(taskList)),
            catchError(error => of(new taskActions.LoadTasksFailAction(error)))
          );
      })
    );

  @Effect() deleteTask$ = this.actions$
    .ofType(taskActions.DELETE_TASK)
    .pipe(
      switchMap((action: taskActions.DeleteTaskAction) => {
        return this.tasksListService.deleteTask(action.payload)
          .pipe(
            map(() => new taskActions.DeleteTaskSuccessAction(action.payload)),
            catchError(error => of(new taskActions.DeleteTaskFailAction(error)))
          );
      })
    );

  @Effect() toggleTask$ = this.actions$
    .ofType(taskActions.TOGGLE_TASK)
    .pipe(
      switchMap((action: taskActions.ToggleTaskAction) => {
        const newPayload = Object.assign({}, action.payload);
        newPayload.completed = !action.payload.completed;

        return this.tasksListService.toggleTask(newPayload)
          .pipe(
            map(() => {
              return new taskActions.ToggleTaskSuccessAction(newPayload);
            }),
            catchError(error => of(new taskActions.ToggleTaskFailAction(error)))
          );
      })
    );

  @Effect() addTask$ = this.actions$
    .ofType(taskActions.ADD_TASK)
    .pipe(
      switchMap((action: taskActions.AddTaskAction) => {

        const newPayload = {
          name: action.payload || 'Do something!',
          id: UUID.UUID(),
          completed: false
        };

        return this.tasksListService.addTask(newPayload)
          .pipe(
            map(() => {
              return new taskActions.AddTaskSuccessAction(newPayload);
            }),
            catchError(error => of(new taskActions.AddTaskFailAction(error)))
          );
      })
    );

}


