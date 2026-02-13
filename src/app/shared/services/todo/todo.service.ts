import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Itodos } from '../../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  BASE_URL  = environment.BASE_URL;

  TODO_URL = `${this.BASE_URL}/todo.json`

  constructor(private _http : HttpClient) { }

 private AddTodoSub : Subject<Itodos> = new Subject<Itodos>();
 AddTodoSubObs : Observable<Itodos> = this.AddTodoSub.asObservable();

 private removeTodoSub : Subject<string> = new Subject<string>();
 removeTodoSubObs : Observable<string> = this.removeTodoSub.asObservable();

 private EditTodoObjSub : Subject<Itodos> = new Subject<Itodos>();
 EditTodoObjSubObs : Observable<Itodos> = this.EditTodoObjSub.asObservable()

 private updateObjSub : Subject<Itodos> = new Subject<Itodos>();
updateObjSubObs : Observable<Itodos> = this.updateObjSub.asObservable();

 EmitNewTodoDash(todo : Itodos){
  this.AddTodoSub.next(todo)
 }

 EmitRemoveID(id : string){
  this.removeTodoSub.next(id)
 }

 EmitEditObj(todo : Itodos){
  this.EditTodoObjSub.next(todo)
 }

 EmitUpdateObj(todo : Itodos){
  this.updateObjSub.next(todo)
 }


  fetchAllTodo(): Observable<any>{
    return this._http.get<any>(this.TODO_URL).pipe(
      map((obj : any) => {
        let todoArr = [];
        for(const key in obj){
          todoArr.push({...obj[key], todoId : key})
        }
        return todoArr
      })
    )
  }

  AddNewTodo(todo : Itodos) : Observable<any>{
    return this._http.post(this.TODO_URL,todo)
  }

  RemoveTodo(id : string): Observable<string>{
    let Remove_url = `${this.BASE_URL}/todo/${id}.json`
    return this._http.delete<string>(Remove_url)
  }

  UpdateObj(todo : Itodos): Observable<Itodos>{
    let UPDATE_URL : string = `${this.BASE_URL}/todo/${todo.todoId}.json`
    return this._http.patch<Itodos>(UPDATE_URL,todo)
  }
  
}
