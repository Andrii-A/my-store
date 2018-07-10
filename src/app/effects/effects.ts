import {Injectable} from '@angular/core';
import {TasksListService} from '../tasks-list/tasks-list.service';

import {Effect, Actions} from '@ngrx/effects';

import * as taskActions from './../actions/actions';

import {switchMap, map} from 'rxjs/operators';




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
            map(tasks => new taskActions.LoadTasksSuccessAction(tasks))
          );
      })
    );

  @Effect() deleteTask$ = this.actions$
    .ofType(taskActions.DELETE_TASK)
    .pipe(
      switchMap((action: taskActions.DeleteTaskAction) => {
        return this.tasksListService.deleteTask(action.payload)
          .pipe(
            map(() => new taskActions.DeleteTaskSuccessAction(action.payload))
          );
      })
    );

  @Effect() toggleTask$ = this.actions$
    .ofType(taskActions.TOGGLE_TASK)
    .pipe(
      switchMap((action: taskActions.ToggleTaskAction) => {
        const newPayload = action.payload;
        newPayload.completed = !action.payload.completed;

        return this.tasksListService.toggleTask(newPayload)
          .pipe(
            map(() => {
              return new taskActions.ToggleTaskSuccessAction(newPayload);
            })
          );
      })
    );

}
