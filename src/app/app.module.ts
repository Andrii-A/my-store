import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TasksListService} from './tasks-list/tasks-list.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

import { taskReducer } from './reducers/reducer';
import {EffectsModule} from '@ngrx/effects';
import {TaskEffects} from './effects/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({tasks: taskReducer}),
    EffectsModule.forRoot([TaskEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [TasksListService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
