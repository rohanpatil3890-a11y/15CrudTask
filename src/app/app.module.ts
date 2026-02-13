import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { TodoDashboardComponent } from './shared/component/todo/todo-dashboard/todo-dashboard.component';
import { TodoFormComponent } from './shared/component/todo/todo-form/todo-form.component';
import { TodoCardComponent } from './shared/component/todo/todo-card/todo-card.component';
import { StudentDashboardComponent } from './shared/component/student/student-dashboard/student-dashboard.component';
import { StudentFormComponent } from './shared/component/student/student-form/student-form.component';
import { StudentCardComponent } from './shared/component/student/student-card/student-card.component';
import { PostDashboardComponent } from './shared/component/post/post-dashboard/post-dashboard.component';
import { PostCardComponent } from './shared/component/post/post-card/post-card.component';
import { PostFormComponent } from './shared/component/post/post-form/post-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GetconformComponent } from './shared/component/getconform/getconform.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoDashboardComponent,
    TodoFormComponent,
    TodoCardComponent,
    StudentDashboardComponent,
    StudentFormComponent,
    StudentCardComponent,
    PostDashboardComponent,
    PostCardComponent,
    PostFormComponent,
    GetconformComponent,
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
  MatDialogModule,
  MatIconModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
