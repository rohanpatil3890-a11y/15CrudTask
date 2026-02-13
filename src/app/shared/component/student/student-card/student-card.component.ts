import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Istudent } from 'src/app/shared/model/student';
import { StudentService } from 'src/app/shared/services/student/student.service';
import { GetconformComponent } from '../../getconform/getconform.component';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {

@Input() StdArr !: Istudent[]

  constructor(private MatDilog : MatDialog,
    private _StudentService : StudentService
  ) { }

  ngOnInit(): void {
  }

  trackByID(index : number, std : Istudent){
    return std.stdId
  }

  onRemove(id : string){
    let config  = new MatDialogConfig();

    config.data = `Are you sure, you want to remove data with id ${id}`
    config.disableClose = true;

    let matDilogRef = this.MatDilog.open(GetconformComponent,config)
    matDilogRef.afterClosed().subscribe(flag =>{
      if(flag === true){
        this._StudentService.RemoveObj(id).subscribe({
          next : data => {
            console.log(data);
            this._StudentService.EmitRemoveID(id)
          },
          error : err =>{
            console.log(err);
            
          }
        })
      }
    })
  }

  onEdit(std : Istudent){
    this._StudentService.EmitEditObj(std)
  }

}
