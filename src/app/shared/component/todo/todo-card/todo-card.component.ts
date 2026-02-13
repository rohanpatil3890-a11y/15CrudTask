import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Itodos } from 'src/app/shared/model/todo';
import { GetconformComponent } from '../../getconform/getconform.component';
import { TodoService } from 'src/app/shared/services/todo/todo.service';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  constructor(
    private _TodoService : TodoService,
    private _matDiloge : MatDialog) { }

  @Input() todoArr !: Itodos[]

  ngOnInit(): void {
  }

  trackById(index : number , todo : Itodos){
    return todo.todoId
  }

  onRemove(id : string){
      let confige  = new MatDialogConfig()
      confige.data = `Are you sure, you want to remove todo with id ${id}`;
      confige.disableClose = true;

      let matDilogeRef = this._matDiloge.open(GetconformComponent,confige)
     matDilogeRef.afterClosed().subscribe(flag =>{
      if(flag === true){
          this._TodoService.RemoveTodo(id).subscribe({
            next : data => {
              console.log(data);
              this._TodoService.EmitRemoveID(id)
              
            },
            error : err => {
              console.log(err);
              
            }
          })
      }
     })
       
  }

  onEdit(todo : Itodos){
    this._TodoService.EmitEditObj(todo)
  }



}
