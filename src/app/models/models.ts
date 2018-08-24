export interface TaskType {
  name: string;
  id: string;
  completed: boolean;
}


export interface TasksState {
  taskList: Array<TaskType>;
  loading: boolean;
  loaded: boolean;
}

export interface AppState {
  tasks: {
    taskList: Array<TaskType>;
    loading: boolean;
    loaded: boolean;
  }
}

