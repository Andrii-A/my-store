import {Injectable} from '@angular/core';
import {TasksListService} from '../tasks-list/tasks-list.service';

import {Effect, Actions} from '@ngrx/effects';

import * as taskActions from './../actions/actions';

import {switchMap, map, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

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
            catchError((error: any) => {
              console.error('Can not load tasks!');
              return throwError(error);
            })
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
            catchError((error: any) => {
              console.error('Can not delete the task!');
              return throwError(error);
            })
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
            catchError((error: any) => {
              console.error('Can not toggle the task!');
              return throwError(error);
            })
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
            catchError((error: any) => {
              console.error('Can not add the task!');
              return throwError(error);
            })
          );
      })
    );

}


