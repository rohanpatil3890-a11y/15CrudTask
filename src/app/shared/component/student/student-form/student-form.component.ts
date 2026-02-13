import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Istudent } from 'src/app/shared/model/student';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  StudentForm !: FormGroup
  IsInEditMode : boolean = false;
  editId !: string

  constructor(private _studentService : StudentService) { }

  ngOnInit(): void {
    this.StudentFormF();
    this.PatchValueForm()
  }

  StudentFormF() {
    this.StudentForm = new FormGroup({
      fname: new FormControl(null, [Validators.required]),
      lname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      contact: new FormControl(null, [Validators.required]),
    })
  }

  onAddStd(){
    if(this.StudentForm.valid){
      let OBJ : Istudent = this.StudentForm.value;
      this._studentService.AddNewUser(OBJ).subscribe({
        next : data =>{
          console.log(data);
          this._studentService.EmitNewStd({...OBJ, stdId : data.name});
          this.StudentForm.reset();

        },
        error : err =>{
          console.log(err);
          
        }
      })
    }
  }

  PatchValueForm(){
    this._studentService.EditObjSubObs.subscribe({
      next : data =>{
        console.log(data);
        this.StudentForm.patchValue(data)
        this.IsInEditMode = true;
        this.editId = data.stdId
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  onUpdate(){
    if(this.StudentForm.valid){
      let UPDATE_OBJ : Istudent = {...this.StudentForm.value,
        stdId : this.editId
      }
     this._studentService.UpdatedObj(UPDATE_OBJ).subscribe({
      next : data =>{
        this._studentService.EmitUpdateObj(UPDATE_OBJ)
        this.IsInEditMode = false;
        this.StudentForm.reset();
      },
      error : err =>{
        console.log(err);
        
      }
     })

    }
  }

}
