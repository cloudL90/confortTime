export interface IMovieModel {
    user_id?: string;
    movie_id?: string;
    collection_id?: string;
    file: any;
    image_url: string;
    timestamp?: number;
    year: string;
    author: IAuthor,
    description: string,
    title: string
}


export interface IAuthor {
    name: string,
    lastName: string
}