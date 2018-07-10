import * as taskActions from './../actions/actions';
import {TaskType} from '../models/models';

import * as _ from 'lodash';


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
    // case taskActions.TOGGLE_TASK: {
    //   return state;
    // }

    case taskActions.TOGGLE_TASK_SUCCESS: {
      // here we are update state with a updated Task we received from Effect
      const newState = _.map(state, (t: TaskType) => {
        if (t.id === action.payload.id) {
          t = action.payload;
        }
        return t;
      });

      return newState;
    }


    default: {
      return state;
    }


  }


}
