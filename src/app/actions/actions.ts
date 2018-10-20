import {Action} from '@ngrx/store';

import {TaskType} from './../models/models';



export const LOAD_TASKS = 'LOAD_TASKS';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';
export const LOAD_TASKS_FAIL = 'LOAD_TASKS_FAIL';

export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAIL = 'DELETE_TASK_FAIL';

export const TOGGLE_TASK = 'TOGGLE_TASK';
export const TOGGLE_TASK_SUCCESS = 'TOGGLE_TASK_SUCCESS';
export const TOGGLE_TASK_FAIL = 'TOGGLE_TASK_FAIL';

export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
export const ADD_TASK_FAIL = 'ADD_TASK_FAIL';


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

export class LoadTasksFailAction implements Action {
  readonly type = LOAD_TASKS_FAIL;
  constructor(public payload: Array<TaskType>) {
  }
}




export class DeleteTaskAction implements Action {
  readonly type = DELETE_TASK;
  constructor(public payload: string) {
  }
}

export class DeleteTaskSuccessAction implements Action {
  readonly type = DELETE_TASK_SUCCESS;
  constructor(public payload: string) {
  }
}

export class DeleteTaskFailAction implements Action {
  readonly type = DELETE_TASK_FAIL;
  constructor(public payload: string) {
  }
}




export class ToggleTaskAction implements Action {
  readonly type = TOGGLE_TASK;
  constructor(public payload: TaskType) {
  }
}

export class ToggleTaskSuccessAction implements Action {
  readonly type = TOGGLE_TASK_SUCCESS;
  constructor(public payload: TaskType) {
  }

}export class ToggleTaskFailAction implements Action {
  readonly type = TOGGLE_TASK_FAIL;
  constructor(public payload: TaskType) {
  }
}


export class AddTaskAction implements Action {
  readonly type = ADD_TASK;
  constructor(public payload: string) {
  }
}



export class AddTaskSuccessAction implements Action {
  readonly type = ADD_TASK_SUCCESS;
  constructor(public payload: TaskType) {
  }
}

export class AddTaskFailAction implements Action {
  readonly type = ADD_TASK_FAIL;
  constructor(public payload: TaskType) {
  }
}

export type Actions
  = LoadTasksAction
  | LoadTasksSuccessAction
  | LoadTasksFailAction
  | DeleteTaskAction
  | DeleteTaskSuccessAction
  | DeleteTaskFailAction
  | ToggleTaskAction
  | ToggleTaskSuccessAction
  | ToggleTaskFailAction
  | AddTaskAction
  | AddTaskSuccessAction
  | AddTaskFailAction;

