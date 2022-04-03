import { environment } from "src/environments/environment";

const url = {
    apiNerdyAppBooks: environment.apiGwBaseEndpoint + '/' + 'books',
    apiNerdyAppMovies: environment.apiGwBaseEndpoint + '/' + 'movies',
    apiNerdyAppMusic: environment.apiGwBaseEndpoint + '/' + 'music',
    apiNerdyAppTvSeries: environment.apiGwBaseEndpoint + '/' + 'tv-series'
    /*image: "http://localhost:8080/api/v1/twincuz/image",
    books: "http://localhost:3000/books",
    books: 'https://ixypa5nb2a.execute-api.eu-west-1.amazonaws.com/books',
    movies: "http://localhost:3000/movies",
    music: "http://localhost:3000/music",
    TvSeries: "http://localhost:3000/tv-series",*/
}

export default url;