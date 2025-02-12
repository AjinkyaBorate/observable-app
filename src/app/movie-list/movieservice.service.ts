import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from './movie.dto';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {
  url: string = 'http://localhost:3000/movies';
  constructor(private http: HttpClient) {

  }
  getMovieList(): Observable<any> {
    return this.http.get<any>(this.url);
   }
   addMovie(m:Movie): Observable<any> {
    return this.http.post<any>(this.url,m);
   }
   deleteMovie(id:number): Observable<any> {
    return this.http.delete<any>(this.url+"/"+id)
   }
   updateMovie(m:Movie): Observable<any> {
    return this.http.put<any>(this.url+"/"+m.id,m);
   }
}
