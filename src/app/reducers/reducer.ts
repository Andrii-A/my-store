import * as taskActions from './../actions/actions';
import {TaskType, TasksState} from '../models/models';

import * as _ from 'lodash';


const initialState: TasksState =  {taskList: [], loading: false, loaded: false};

export function taskReducer(state = initialState, action: taskActions.Actions) {
  switch (action.type) {

    case taskActions.LOAD_TASKS: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case taskActions.LOAD_TASKS_SUCCESS: {
      const taskList = action.payload;

      return {
        ...state,
        taskList,
        loading: false,
        loaded: true
      };

    }

    // case taskActions.DELETE_TASK: {
    //   return state;
    // }

    case taskActions.DELETE_TASK_SUCCESS: {
      const newState = state.taskList.filter(task => task.id !== action.payload);
      return newState;
    }

    // case taskActions.TOGGLE_TASK: {
    //   return state;
    // }

    case taskActions.TOGGLE_TASK_SUCCESS: {
      // here we are update state with a updated Task we received from Effect
      const newState = _.map(state.taskList, (t: TaskType) => {
        if (t.id === action.payload.id) {
          t = action.payload;
        }
        return t;
      });

      return newState;
    }


    // case taskActions.ADD_TASK: {
    //   return state;
    // }

    case taskActions.ADD_TASK_SUCCESS: {
      // here we are update state with a updated Task we received from Effect
      return [...state.taskList, action.payload];
    }


    default: {
      return state;
    }


  }


}
