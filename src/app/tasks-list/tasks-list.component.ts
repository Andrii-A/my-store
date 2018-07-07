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
    this.tasksListService.getTasks();

    this.tasksListService.stream$().subscribe(res => {
      this.tasks = res;
      this.newName = '';
    });
  }


  delete(task: TaskType) {
    this.tasksListService.deleteTask(task);
  }

  toggle(task: TaskType) {
    this.tasksListService.toggleTask(task);
  }

  add(name: string) {
    this.tasksListService.addTask(name);
  }


}
