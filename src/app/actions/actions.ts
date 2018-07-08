import {Action} from '@ngrx/store';

import {TaskType} from './../models/models';



export const LOAD_TASKS = 'LOAD_TASKS';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';

export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';


export class LoadTasksAction implements Action {
  readonly type = LOAD_TASKS;

  constructor() {
  }
}

export class LoadTasksSuccessAction implements Action {
  readonly type = LOAD_TASKS_SUCCESS;

  constructor(public payload: Array<TaskType>) {
  }
}


export class DeleteTaskAction implements Action {
  readonly type = DELETE_TASK;

  constructor(public payload: number) {
  }
}

export class DeleteTaskSuccessAction implements Action {
  readonly type = DELETE_TASK_SUCCESS;

  constructor(public payload: number) {
  }
}

export type Actions
  = LoadTasksAction
  | LoadTasksSuccessAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction;

