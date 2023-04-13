import "./App.css";
import { getMovieList, searchMovie } from "./API";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovie, setPopularMovie] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovie(result);
    });
  }, []);

  // console.log({ popularMovie: popularMovie });
  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          ></img>
          <div className="Movie-date">Release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length >= 1) {
      const query = await searchMovie(q);
      setPopularMovie(query.results);
      console.log({ query: query });
    } else {
      getMovieList().then((result) => {
        setPopularMovie(result);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Website</h1>
        <input
          placeholder="Cari film..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        ></input>
        <div className="Movie-container">
          <PopularMovieList></PopularMovieList>
        </div>
        <footer className="Footer">
          <div>Developed by Naufal Syarif</div>
          <div>
            Movie data taken from{" "}
            <a href="https://www.themoviedb.org/">The Movie Database (TMDB)</a>
          </div>
        </footer>
      </header>
    </div>
  );
};

export default App;
