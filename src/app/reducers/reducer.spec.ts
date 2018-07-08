import * as taskActions from './../actions/actions';
import {taskReducer} from './reducer';

describe('taskReducer', () => {

  describe('deleteTaskAction', () => {

    it('should delete a task', () => {
      const currentState = [
        {'name': 'First Task', 'id': 1, 'completed': false},
        {'name': 'Go sleep', 'id': 2, 'completed': false}
      ];

      const expected = [{'name': 'Go sleep', 'id': 2, 'completed': false}];

      const action = new taskActions.DeleteTaskSuccessAction(1);
      const result = taskReducer(currentState, action);

      expect(result).toEqual(expected);
    });

  });


});
