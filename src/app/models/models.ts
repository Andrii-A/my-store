export type TaskType = {
  name: string,
  id: number,
  completed: boolean
};


export interface AppState {
  tasks: Array<TaskType>;
}
