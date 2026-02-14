import { Component, OnInit } from '@angular/core';
import { Itodos } from 'src/app/shared/model/todo';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TodoService } from 'src/app/shared/services/todo/todo.service';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {

  todoArr : Itodos[]= [];

  constructor(private _tosService : TodoService,
    private _snackBar : SnackbarService
  ) { }

  ngOnInit(): void {
  

    this._tosService.fetchAllTodo().subscribe({
      next : data => {
        console.log(data);
        this.todoArr = data
       
        
      },
      error : err => {
        console.log(err);
        
      }
    })

    this.AddArrNEwObj()
    this.removeObjArr()
    this.UpdateTodoArr()
  }

  AddArrNEwObj( ){
    this._tosService.AddTodoSubObs.subscribe({
      next :data => {
        console.log(data);
        this.todoArr.push(data)
         this._snackBar.snackBar(`The Student with id ${data.todoId} is created successfully`)
        
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

  removeObjArr(){
    this._tosService.removeTodoSubObs.subscribe({
      next : data=> {
        console.log(data);
        
        let getIndex = this.todoArr.findIndex(p => p.todoId === data);

        if(getIndex>-1)
        this.todoArr.splice(getIndex,1)
      this._snackBar.snackBar(`The Student with id ${data} is delete successfully`)
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

  UpdateTodoArr(){
    this._tosService.updateObjSubObs.subscribe({
      next : data => {
        console.log(data);
        let getIndex  = this.todoArr.findIndex(p => p.todoId === data.todoId);
        this.todoArr[getIndex] = data
        this._snackBar.snackBar(`The Student with id ${data.todoId} is updated successfully`)
        
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

}
