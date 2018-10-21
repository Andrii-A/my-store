import * as taskActions from './../actions/actions';
import {taskReducer} from './tasksReducer';

describe('taskReducer', () => {

  describe('deleteTaskAction', () => {

    it('should delete a task', () => {
      const currentState = {
        taskList: [
          {'name': 'First Task', 'id': '1', 'completed': false},
          {'name': 'Go sleep', 'id': '2', 'completed': false}
        ],
        loading: false,
        loaded: true,
        networkErr: false
      };

      const expected = {
        taskList: [
          {'name': 'Go sleep', 'id': '2', 'completed': false}
        ],
        loading: false,
        loaded: true,
        networkErr: false
      };

      const action = new taskActions.DeleteTaskSuccessAction('1');
      const result = taskReducer(currentState, action);

      expect(result).toEqual(expected);
    });

  });


  describe('addTaskAction', () => {

    it('should add a task', () => {
      const currentState = {
        taskList: [
          {'name': 'First Task', 'id': '1', 'completed': false},
        ],
        loading: false,
        loaded: true,
        networkErr: false
      };


      const newTask = {'name': 'Go sleep', 'id': '2', 'completed': false};

      const expected = {
        taskList: [
          {'name': 'First Task', 'id': '1', 'completed': false},
          {'name': 'Go sleep', 'id': '2', 'completed': false}

        ],
        loading: false,
        loaded: true,
        networkErr: false
      };

      const action = new taskActions.AddTaskSuccessAction(newTask);
      const result = taskReducer(currentState, action);

      expect(result).toEqual(expected);
    });

  });


  describe('toggleTaskAction', () => {

    it('should toggle a task', () => {
      const currentState = {
        taskList: [
          {'name': 'First Task', 'id': '1', 'completed': false},
          {'name': 'Go sleep', 'id': '2', 'completed': false}

        ],
        loading: false,
        loaded: true,
        networkErr: false
      };

      const toggled = {'name': 'First Task', 'id': '1', 'completed': true};

      const expected = {
        taskList: [
          {'name': 'First Task', 'id': '1', 'completed': true},
          {'name': 'Go sleep', 'id': '2', 'completed': false}
        ],
        loading: false,
        loaded: true,
        networkErr: false
      };



      const action = new taskActions.ToggleTaskSuccessAction(toggled);
      const result = taskReducer(currentState, action);

      expect(result).toEqual(expected);
    });

  });


});
