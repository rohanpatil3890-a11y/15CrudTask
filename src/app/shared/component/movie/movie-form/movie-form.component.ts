import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMovie } from 'src/app/shared/model/movie/movie';
import { MovieService } from 'src/app/shared/services/movie/movie.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  movieForm !: FormGroup
  isinEditMode : boolean = false
  EditId !: string

  constructor(private _MovieService : MovieService) { }

  ngOnInit(): void {
    this.creatNewControls();
    this.patchValueForm()

  }

  creatNewControls() {
    this.movieForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      path: new FormControl(null, [Validators.required])
    })
  }

  AddNewMovie(){
    if(this.movieForm.valid){
      let OBJ = this.movieForm.value
     this._MovieService.AddNewMovie(OBJ).subscribe({
      next : data => {
        console.log(data);
        this._MovieService.EmitNewMove({...OBJ, movieId : data.name});
        this.movieForm.reset();
      },
      error : err =>{
        console.log(err);
        
      }
     })
    }
  }

  patchValueForm(){
    this._MovieService.EditMovieSubObs.subscribe({
      next : data =>{
        console.log(data);
        this.movieForm.patchValue(data)
        this.isinEditMode = true;
        this.EditId = data.movieId
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  onUpdate(){
    if(this.movieForm.valid){
      let UPDATE_OBJ : IMovie = {...this.movieForm.value , movieId : this.EditId}
      this._MovieService.UpdatedMovie(UPDATE_OBJ).subscribe({
        next : data =>{
          console.log(data);
          this._MovieService.EmitUpdateObj(UPDATE_OBJ)
          this.movieForm.reset();
          this.isinEditMode = false;
        },
        error : err =>{
          console.log(err);
          
        }
          
          
      })
    }
  }

}
