import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

const appRoutes: Routes = [
  { path: 'addTask', component: AddTaskComponent },
  { path: 'viewTask',      component: ViewTaskComponent },
  { path: 'updateTask', component: UpdateTaskComponent },
  { path: '', redirectTo: '/addTask', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    UpdateTaskComponent
  ],
  imports: [
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
