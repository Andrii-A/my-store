import {TaskType} from './../models/';


export const LOAD_TASKS = 'LOAD_TASKS';
export const LOAD_TASKS_SUCCESS = 'LOAD_TASKS_SUCCESS';


export class LoadTasksAction {
  readonly type = LOAD_TASKS;

  constructor() {
  }
}

export class LoadTasksSuccessAction {
  readonly type = LOAD_TASKS_SUCCESS;

  constructor(public payload: Array<TaskType>) {
  }
}

export type Action
  = LoadTasksAction
  | LoadTasksSuccessAction;

