import { Component, OnInit } from '@angular/core';
import { Istudent } from 'src/app/shared/model/student';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private _StudentService : StudentService,
    private _snackBar : SnackbarService
  ) { }

  StdArr !: Istudent[]

  ngOnInit(): void {
    this.fetchAllStd()
    this.addNewStdArr()

    this.RemoveObjArr()
    this.updateObjArr()
  }

  fetchAllStd(){
    this._StudentService.fetchAllData().subscribe({
      next : data =>{
        console.log(data);
        this.StdArr= data
        
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  addNewStdArr(){
    this._StudentService.AddNewStdSubObs.subscribe({
      next : data => {
        console.log(data);
        this.StdArr.push(data)
        this._snackBar.snackBar(`The Student with id ${data.stdId} is created successfully`)
        
        
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  RemoveObjArr(){
    this._StudentService.RemoveObjSubObs.subscribe({
      next : data => {
        console.log(data);
        let getIndex = this.StdArr.findIndex(p => p.stdId === data);
        this.StdArr.splice(getIndex,1)
        this._snackBar.snackBar(`The Student with id ${data} is removed successfully`)
        
      },
      error : err => {
        console.log(err);
        
      }
    })
  }

  updateObjArr(){
    this._StudentService.UpdateObjSubObs.subscribe({
      next : data =>{
        console.log(data);
        let getIndex = this.StdArr.findIndex(p => p.stdId === data.stdId);
        this.StdArr[getIndex] = data
        this._snackBar.snackBar(`The Student with id ${data.stdId} is Updated successfully`)
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }
}
