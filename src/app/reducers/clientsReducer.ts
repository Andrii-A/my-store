import * as taskActions from './../actions/actions';
import {ClientType, ClientsState} from '../models/models';

import * as _ from 'lodash';


const initialState: ClientsState = {clientList: [], loading: false, loaded: false, networkErr: false};

export function clientsReducer(state = initialState, action: taskActions.Actions) {
  switch (action.type) {

    case taskActions.LOAD_TASKS: {
      return {
        ...state,
        loading: true,
        loaded: false,
        networkErr: false
      };
    }

    case taskActions.LOAD_TASKS_SUCCESS: {
      const clientList = action.payload;

      return {
        ...state,
        clientList,
        loading: false,
        loaded: true,
        networkErr: false
      };

    }

    case taskActions.LOAD_TASKS_FAIL: {
      const clientList = action.payload;

      return {
        ...state,
        clientList,
        loading: false,
        loaded: false,
        networkErr: true
      };

    }

    case taskActions.DELETE_TASK: {
      return {
        ...state,
        loading: true,
        loaded: false,
        networkErr: false
      };
    }

    case taskActions.DELETE_TASK_SUCCESS: {
      const clientList = state.clientList.filter(task => task.id !== action.payload);

      return {
        ...state,
        clientList,
        loading: false,
        loaded: true,
        networkErr: false
      };
    }

    case taskActions.DELETE_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        networkErr: true
      };
    }

    case taskActions.TOGGLE_TASK: {
      return {
        ...state,
        loading: true,
        loaded: false,
        networkErr: false
      };
    }

    case taskActions.TOGGLE_TASK_SUCCESS: {
      // here we are update state with a updated Task we received from Effect
      const clientList = _.map(state.clientList, (t: ClientType) => {
        if (t.id === action.payload.id) {
          t = action.payload;
        }
        return t;
      });

      return {
        ...state,
        clientList,
        loading: false,
        loaded: true,
        networkErr: false
      };
    }

    case taskActions.TOGGLE_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        networkErr: true
      };
    }


    case taskActions.ADD_TASK: {
      return {
        ...state,
        loading: true,
        loaded: false,
        networkErr: false

      };
    }

    case taskActions.ADD_TASK_SUCCESS: {
      // here we are update state with a updated Task we received from Effect
      const clientList = [...state.clientList, action.payload];

      return {
        ...state,
        clientList,
        loading: false,
        loaded: true,
        networkErr: false
      };
    }

    case taskActions.ADD_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        networkErr: true
      };
    }


    default: {
      return state;
    }


  }


}
