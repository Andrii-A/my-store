import { Injectable } from '@angular/core';

@Injectable()
export class TasksListService {

  constructor() { }

  getTasks(): Array<any> {
    return [1,2,3,4,5];
  }
}
