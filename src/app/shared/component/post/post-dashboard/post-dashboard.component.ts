import { Component, OnInit } from '@angular/core';
import { Ipost } from 'src/app/shared/model/post';
import { PostService } from 'src/app/shared/services/post/post.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  constructor(private _postService : PostService,
    private _snackBar : SnackbarService
  ) { }

  postArr : Ipost[] = []

  ngOnInit(): void {
    this.fetchAllPost()
    this. AddObjArr()
    this.removeObjArr()
    this.UpdateObjArr();
  }

  trackById(index : number, post : Ipost){
    return post.id
  }

  fetchAllPost(){
    this._postService.fetchAllPost().subscribe({
      next : data =>{
        console.log(data);
        this.postArr = data
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  AddObjArr(){
   this._postService.AddNewObjSubObs.subscribe({
    next : data => {
      console.log(data);
      this.postArr.push(data);
      this._snackBar.snackBar(`The post with id ${data.id} is created successfully`)
      
    },
    error : err =>{
      console.log(err);
      
    }
   })
  }

  removeObjArr(){
    this._postService.RemoveObjSubObs.subscribe({
      next : data => {
        console.log(data);
        let getIndex  = this.postArr.findIndex(p => p.id === data);
        this.postArr.splice(getIndex,1)
        this._snackBar.snackBar(`The post with id ${data} is removed successfully`)
        
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  UpdateObjArr(){
    this._postService.UpdateObjSubObs.subscribe({
      next : data =>{
        console.log(data);
        let getIndex = this.postArr.findIndex(p => p.id === data.id);
        this.postArr[getIndex] = data;
        this._snackBar.snackBar(`The post with id ${data.id} is Updated successfully`)
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }
}
