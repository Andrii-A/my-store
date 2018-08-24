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

    case taskActions.DELETE_TASK: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case taskActions.DELETE_TASK_SUCCESS: {
      const taskList = state.taskList.filter(task => task.id !== action.payload);

      return {
        ...state,
        taskList,
        loading: false,
        loaded: true
      };
    }

    case taskActions.TOGGLE_TASK: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case taskActions.TOGGLE_TASK_SUCCESS: {
      // here we are update state with a updated Task we received from Effect
      const taskList = _.map(state.taskList, (t: TaskType) => {
        if (t.id === action.payload.id) {
          t = action.payload;
        }
        return t;
      });

      return {
        ...state,
        taskList,
        loading: false,
        loaded: true
      };
    }


    case taskActions.ADD_TASK: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }

    case taskActions.ADD_TASK_SUCCESS: {
      // here we are update state with a updated Task we received from Effect
      const taskList = [...state.taskList, action.payload];

      return {
        ...state,
        taskList,
        loading: false,
        loaded: true
      };
    }


    default: {
      return state;
    }


  }


}
