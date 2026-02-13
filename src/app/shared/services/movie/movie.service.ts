import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovie } from '../../model/movie/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  BASE_URL = environment.BASE_URL;
  MOVIE_URL : string = `${this.BASE_URL}/movie.json`;

  private AddMovieSub : Subject<IMovie> = new Subject<IMovie>();
  AddMovieSubObs : Observable<IMovie> = this.AddMovieSub.asObservable()

  private RemoveIdSub : Subject<string> = new Subject<string>();
    RemoveIdSubObs : Observable<string> = this.RemoveIdSub.asObservable();

    private EditMovieSub: Subject<IMovie> = new Subject<IMovie>();
  EditMovieSubObs : Observable<IMovie> = this.EditMovieSub.asObservable()

  private UpdateMovieSub: Subject<IMovie> = new Subject<IMovie>();
  UpdateMovieSubObs : Observable<IMovie> = this.UpdateMovieSub.asObservable()



  constructor(private _http : HttpClient) { }

  EmitUpdateObj(movie : IMovie){
    this.UpdateMovieSub.next(movie)
  }

  EmitEditObj(movie : IMovie){
    this.EditMovieSub.next(movie)
  }

  EmitRemoveId(id : string){
    this.RemoveIdSub.next(id);
  }

  EmitNewMove(movie : IMovie){
    this.AddMovieSub.next(movie)
  }

  fetchArrData() : Observable<any>{
    return this._http.get<any>(this.MOVIE_URL).pipe(
      map((obj : any) =>{
        let movieArr = [];
        for(const key in obj){
          movieArr.push({...obj[key], movieId : key})
        }
        return movieArr
      })
    )
  }

  AddNewMovie(movie : IMovie): Observable<any>{
    return this._http.post<any>(this.MOVIE_URL,movie);
  }

  RemoveMovie(id : string) : Observable<any>{
    return this._http.delete<any>(`${this.BASE_URL}/movie/${id}.json`)
  }

  UpdatedMovie(UpdatedObj : IMovie) : Observable<IMovie>{
    let UPDATE_URL : string = `${this.BASE_URL}/movie/${UpdatedObj.movieId}.json`;
  return this._http.patch<IMovie>(UPDATE_URL,UpdatedObj)
  }
}
