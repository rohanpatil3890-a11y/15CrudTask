import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/shared/model/movie/movie';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-movi-dashboard',
  templateUrl: './movi-dashboard.component.html',
  styleUrls: ['./movi-dashboard.component.scss']
})
export class MoviDashboardComponent implements OnInit {

  constructor(private _movieService : MovieService,
    private _snackBar : SnackbarService
  ) { }

  movieArr : IMovie[]  = []

  ngOnInit(): void {
    this.fetchAllMovie()
    this.AddNewMovieArr()
    this.RemoveFromArr()
    this.UpdateObjArr()
  }

  fetchAllMovie(){
    this._movieService.fetchArrData().subscribe({
      next : data =>{
        console.log(data);
      this.movieArr = data
        
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  AddNewMovieArr(){
    this._movieService.AddMovieSubObs.subscribe({
      next : data =>{
        console.log(data);
        this.movieArr.push(data)
        this._snackBar.snackBar(`The movie with id ${data.movieId} is created successfully`)
        
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  trackById(index : number, movie : IMovie){
    return movie.movieId
  }

  RemoveFromArr(){
    this._movieService.RemoveIdSubObs.subscribe({
      next : data =>{
        let getIndex = this.movieArr.findIndex(p => p.movieId === data);
        this.movieArr.splice(getIndex,1)
        this._snackBar.snackBar(`The movie with id ${data} is removed successfully`)
        
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  UpdateObjArr(){
    this._movieService.UpdateMovieSubObs.subscribe({
      next : data => {
       let getIndex = this.movieArr.findIndex(P => P.movieId === data.movieId);
       this.movieArr[getIndex] = data;
        this._snackBar.snackBar(`The movie with id ${data.movieId} is Updated successfully`)
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

}
