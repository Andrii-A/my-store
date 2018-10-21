export interface AppState {
  tasks: TasksState;
  clients: ClientsState;
}


export interface TasksState {
  taskList: Array<TaskType>;
  loading: boolean;
  loaded: boolean;
  networkErr: boolean;
}

export interface TaskType {
  name: string;
  id: string;
  completed: boolean;
}



export interface ClientsState {
  clientList: Array<ClientType>;
  loading: boolean;
  loaded: boolean;
  networkErr: boolean;
}


export interface ClientType {
  name: string;
  id: string;
  completed: boolean;
  phone?: number;
}


