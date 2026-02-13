import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Istudent } from '../../model/student';
import { Itodos } from '../../model/todo';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  BASE_URL = environment.BASE_URL;
  STUDENT_URL : string = `${this.BASE_URL}/student.json`

  constructor(private _http : HttpClient) { }

 private AddNewStdSub : Subject<Istudent> = new Subject<Istudent>();
AddNewStdSubObs : Observable<Istudent> = this.AddNewStdSub.asObservable();

private RemoveObjSub : Subject<string> = new Subject<string>();
RemoveObjSubObs : Observable<string> = this.RemoveObjSub.asObservable();

private EditObjSub : Subject<Istudent> = new Subject<Istudent>();
EditObjSubObs : Observable<Istudent> = this.EditObjSub.asObservable();

private UpdateObjSub : Subject<Istudent> = new Subject<Istudent>();
UpdateObjSubObs : Observable<Istudent> = this.UpdateObjSub.asObservable();



EmitNewStd(std : Istudent){
  this.AddNewStdSub.next(std)
}

EmitRemoveID(id : string){
this.RemoveObjSub.next(id)
}

EmitEditObj(std : Istudent){
  this.EditObjSub.next(std)
}

EmitUpdateObj(std : Istudent){
  this.UpdateObjSub.next(std)
}

fetchAllData() : Observable<any>{
  return this._http.get<any>(this.STUDENT_URL).pipe(
    map ((obj : any) =>{
      let studentArr = [];
      for(const key in obj){
        studentArr.push({...obj[key] , stdId : key})
      }
      return studentArr
    })
  )
}

AddNewUser(std : Istudent) : Observable<any>{
  return this._http.post<any>(this.STUDENT_URL,std)
}

RemoveObj(id : string) : Observable<string>{
  return this._http.delete<string>(`${this.BASE_URL}/student/${id}.json`)
}

UpdatedObj(std : Istudent) : Observable<Istudent>{
  let UPDATE_URL : string = `${this.BASE_URL}/student/${std.stdId}.json`;
  return this._http.patch<Istudent>(UPDATE_URL,std)
}

}
