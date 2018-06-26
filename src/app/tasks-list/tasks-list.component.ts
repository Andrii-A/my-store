import { Component, OnInit } from '@angular/core';
import {TasksListService} from './tasks-list.service';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: Array<any>;

  constructor(private tasksListService: TasksListService) { }

  ngOnInit() {
    this.tasks = this.tasksListService.getTasks();


  }

}
