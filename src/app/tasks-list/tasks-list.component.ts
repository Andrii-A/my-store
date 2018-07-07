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
  loading: boolean;
  networkError: boolean;

  constructor(private tasksListService: TasksListService) {
  }

  ngOnInit() {
    this.tasksListService.getTasks();

    this.tasksListService.dataStream$().subscribe(res => {
      this.tasks = res;
      this.newName = '';
    });

    this.tasksListService.statusStream$().subscribe(res => {
      switch(res) {
        case 'busy':
          this.loading = true;
          break;
        case 'ready':
          this.loading = false;
          break;
        case 'error':
          this.loading = true;
          this.networkError = true;
          break;
        default:
          this.loading = false;
      }

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
