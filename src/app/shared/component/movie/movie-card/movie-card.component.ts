import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IMovie } from 'src/app/shared/model/movie/movie';
import { GetconformComponent } from '../../getconform/getconform.component';
import { MovieService } from 'src/app/shared/services/movie/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movieObj !: IMovie;


  constructor(private _MatDiloge: MatDialog,
    private _movieService: MovieService
  ) { }

  ngOnInit(): void {
  }

  onRemove() {
    let matConfi = new MatDialogConfig();
    matConfi.data = `Are You Sure, Youy Want To Remove Movie With Id ${this.movieObj.movieId}`;
    matConfi.disableClose = true;

    let MatDilogRef = this._MatDiloge.open(GetconformComponent, matConfi)
    MatDilogRef.afterClosed().subscribe(flag => {
      if (flag === true) {
        this._movieService.RemoveMovie(this.movieObj.movieId).subscribe({
          next: data => {
            console.log(data);
            this._movieService.EmitRemoveId(this.movieObj.movieId)
          },
          error: err => {
            console.log(err);

          }
        })
      }
    })
  }

  onEdit(){
    this._movieService.EmitEditObj(this.movieObj)
  }

}
