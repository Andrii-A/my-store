import {Component, OnInit} from '@angular/core';
import {TasksListService} from './tasks-list.service';
import {TaskModel} from '../models/models';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  tasks: Array<TaskModel>;

  constructor(private tasksListService: TasksListService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksListService.getTasks().subscribe((res: Array<TaskModel>) => {
      this.tasks = res;
    });
  }

  delete(task: TaskModel) {
    this.tasksListService.deleteTask(task).subscribe((res: Array<TaskModel>) => {
      this.getTasks();
    });
  }

  toggle(task: TaskModel) {
    this.tasksListService.toggleTask(task).subscribe((res: Array<TaskModel>) => {
      this.getTasks();
    });
  }


}
