import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ipost } from 'src/app/shared/model/post';
import { Istudent } from 'src/app/shared/model/student';
import { PostService } from 'src/app/shared/services/post/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  constructor(private _postServiece : PostService) { }

  postForm !: FormGroup
  isinEditMode : boolean = false;
  editId !: string 

  userArr = [1,2,3,4,5,6,7,8,9,10]

  ngOnInit(): void {
    this.createForm();
    this.PatchObjForm()
  }

createForm(){
  this.postForm = new FormGroup({
   title : new FormControl(null,[Validators.required]),
   body : new FormControl(null,[Validators.required]),
   userId : new FormControl(null,[Validators.required]),
  })
}

onAddPost(){
  if(this.postForm.valid){
    let OBJ : Ipost = this.postForm.value;
    this._postServiece.AddNewPost(OBJ).subscribe({
      next : data => {
        this._postServiece.EmitNewObj({...OBJ, id : data.name});
        this.postForm.reset();
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }
}

PatchObjForm(){
 this._postServiece.AddEditObjSubObs.subscribe({
  next : post =>{
     if(post){
    this.postForm.patchValue(post);
    this.isinEditMode = true;
    this.editId = post.id
  }
  },
  error : err =>{
    console.log(err);
    
  }
 })
}

onUpdate(){
if(this.postForm.valid){
  let UPDATE_OBJ : Ipost = {...this.postForm.value, id : this.editId}

  this._postServiece.UpdateObj(UPDATE_OBJ).subscribe({
    next : data =>{
      console.log(data);
      this._postServiece.EmitUpdateObj(UPDATE_OBJ);
      this.isinEditMode = false;
      this.postForm.reset();
    },
    error : err =>{
      console.log(err);
      
    }
  })
}
}


}
