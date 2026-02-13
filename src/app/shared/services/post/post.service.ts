import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  BASE_URL = environment.BASE_URL;

  POST_URL : string = `${this.BASE_URL}/post.json`

  constructor(private _http : HttpClient) { }

  private AddNewObjSub : Subject<Ipost> = new Subject<Ipost>();
  AddNewObjSubObs : Observable<Ipost> = this.AddNewObjSub.asObservable();

  private RemoveObjSub : Subject<string> = new Subject<string>();
  RemoveObjSubObs : Observable<string> = this.RemoveObjSub.asObservable();

   private EditObjSub : Subject<Ipost> = new Subject<Ipost>();
  AddEditObjSubObs : Observable<Ipost> = this.EditObjSub.asObservable();

   private UpdateObjSub : Subject<Ipost> = new Subject<Ipost>();
  UpdateObjSubObs : Observable<Ipost> = this.UpdateObjSub.asObservable();

  EmitNewObj(post : Ipost){
    this.AddNewObjSub.next(post)
  }

  EmitRemoveID(id : string){
    this.RemoveObjSub.next(id)
  }

  EmitEditObj(post : Ipost){
    this.EditObjSub.next(post)
  }

  EmitUpdateObj(post : Ipost){
    this.UpdateObjSub.next(post)
  }

  fetchAllPost() : Observable<any>{
   return this._http.get<any>(this.POST_URL).pipe(
    map((obj : any)=>{
      let postArr = [];
      for(const key in obj){
        postArr.push({...obj[key], id : key})
      }
      return postArr
    })
   )
  }

  AddNewPost(post : Ipost): Observable<any>{
    return this._http.post<any>(this.POST_URL,post)
  }

  RemoveObj(id : string): Observable<string>{
    return this._http.delete<string>(`${this.BASE_URL}/post/${id}.json`)
  }

  UpdateObj(post : Ipost) : Observable<Ipost>{
    return this._http.patch<Ipost>(`${this.BASE_URL}/post/${post.id}.json`, post)
  }

  
}
