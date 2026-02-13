import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Itodos } from 'src/app/shared/model/todo';
import { TodoService } from 'src/app/shared/services/todo/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  constructor(private _tdodService : TodoService) { }

   todoForm !: FormGroup

   EditId !: string

   isInEditMode : boolean = false;

  ngOnInit(): void {
    this.createForm()
    this.Patchdata()
  }

  Patchdata(){
    this._tdodService.EditTodoObjSubObs.subscribe({
      next : data=>{
        console.log(data);
        this.todoForm.patchValue(data);
        this.isInEditMode = true;
        this.EditId = data.todoId
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

 createForm(){
   this.todoForm = new FormGroup ({
    todoName : new FormControl(null, [Validators.required])
  })
 }

 get f(){
 return this.todoForm.controls
 }

 onAddTodo(){
  if(this.todoForm.valid){
    let OBJ : Itodos = this.todoForm.value;

  this._tdodService.AddNewTodo(OBJ).subscribe({
    next : data => {
      this._tdodService.EmitNewTodoDash({...OBJ, todoId : data.name});
      this.todoForm.reset();
    }
  })
  }
 }

 onUpdate(){
  if(this.todoForm.valid){
    let UPDATE_OBJ : Itodos = {...this.todoForm.value, todoId : this.EditId}
   this._tdodService.UpdateObj(UPDATE_OBJ).subscribe({
    next : data =>{
      console.log(data);
      this._tdodService.EmitUpdateObj(data)
      this.todoForm.reset();
      this.isInEditMode = false;
      
    },
    error : err => {
      console.log(err);
      
    }
   })
  }
 }



}
