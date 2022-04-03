import { IMovieModel } from "./movies.model";

export interface GetMoviesRequest {
    movie_id?: string;
    user_id: string;
}

export interface GetMovieRequest {
    user_id: string;
    movie_id: string;
}

export interface UpdateMovieRequest {
    user_id: string;
    movie_id: string;
    data: IMovieModel;
}

export interface DeleteMovieRequest extends GetMovieRequest { }