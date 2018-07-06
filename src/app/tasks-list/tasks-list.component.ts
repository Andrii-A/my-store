import {Component, OnInit} from '@angular/core';
import {TasksListService} from './tasks-list.service';
import {TaskType} from '../models/models';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: Array<TaskType>;
  newName: string;

  constructor(private tasksListService: TasksListService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksListService.getTasks().subscribe((res: Array<TaskType>) => {
        this.tasks = res;
        this.newName = '';
      },
      err => {
        console.error('can`t get `em! >>>', err);
      });
  }

  delete(task: TaskType) {
    this.tasksListService.deleteTask(task).subscribe((res: Array<TaskType>) => {
        this.getTasks();
      },
      err => {
        console.error('can`t delete ! >>>', err);
      });
  }

  toggle(task: TaskType) {
    this.tasksListService.toggleTask(task).subscribe((res: Array<TaskType>) => {
        this.getTasks();
      },
      err => {
        console.error('can`t toggle! >>>', err);
      });
  }

  add(name) {
    this.tasksListService.addTask(name).subscribe((res: Array<TaskType>) => {
        this.getTasks();
      },
      err => {
        console.error('can`t add it! >>>', err);
      });
  }


}
