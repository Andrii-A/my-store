import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import {TasksListService} from './tasks-list/tasks-list.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [TasksListService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
