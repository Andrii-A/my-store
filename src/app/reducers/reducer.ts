import * as taskActions from './../actions/actions';


export function taskReducer(state = [], action: taskActions.Actions) {
  switch (action.type) {

    // case taskActions.LOAD_TASKS: {
    //   return state;
    // }

    case taskActions.LOAD_TASKS_SUCCESS: {
      return action.payload;
    }

    // case taskActions.DELETE_TASK: {
    //   return state;
    // }

    case taskActions.DELETE_TASK_SUCCESS: {
      const newState = state.filter(task => task.id !== action.payload);
      return newState;
    }


    default: {
      return state;
    }


  }


}
