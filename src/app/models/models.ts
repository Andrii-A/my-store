export type TaskType = {
  name: string,
  id: string,
  completed: boolean
};


export interface AppState {
  tasks: Array<TaskType>;
}
