import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ipost } from 'src/app/shared/model/post';
import { GetconformComponent } from '../../getconform/getconform.component';
import { PostService } from 'src/app/shared/services/post/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  constructor(private _matDiloge : MatDialog,
    private _postService : PostService
  ) { }

  @Input() postObj !: Ipost

  ngOnInit(): void {
  }

  onRemove(){
  let config = new MatDialogConfig();
  config.data = `Are You Sure, you want to remove post with id ${this.postObj.id}`;
  config.disableClose = true;

  let MatDilogeFRef = this._matDiloge.open(GetconformComponent,config)
  MatDilogeFRef.afterClosed().subscribe(flag => {
    if(flag === true){
      this._postService.RemoveObj(this.postObj.id).subscribe({
        next : data => {
          this._postService.EmitRemoveID(this.postObj.id)
        },
        error : err => {
          console.log(err);
          
        }
      })
    }
  })
  }

  onEdit(){
    this._postService.EmitEditObj(this.postObj)
  }

}
