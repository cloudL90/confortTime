import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSessionService } from 'src/app/core/userSession/services/user-session.service';
import url from 'src/app/shared/constants/url';
import { DeleteMovieRequest, GetMoviesRequest } from '../models/movies-request.models';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient, private userSessionService: UserSessionService) { }

  public registerMovie(movie: any) {
    return this.httpClient.post<any>(url.apiNerdyAppMovies, movie);
  }

  public getMovies(request: GetMoviesRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.get<any>(url.apiNerdyAppMovies + '/' + user_id);
  }

  public updatedMovies(request: GetMoviesRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.put(url.apiNerdyAppMovies + '/' + user_id + '/' + request.movie_id, request);
  }

  public deleteMovie(request: DeleteMovieRequest) {
    const user_id = this.userSessionService.getUserData()['user_id'];
    return this.httpClient.delete(url.apiNerdyAppMovies + '/' + user_id + '/' + request.movie_id);
  }
}
