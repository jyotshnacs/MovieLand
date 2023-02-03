import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./Search.svg";
// const API_KEY = b6003d8a
const API_URL = "http://www.omdbapi.com/?apikey=66ade955";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data.Search);
    setMovies(data.Search);
  };

  const onSuggestHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    setSuggestions([]);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchTerm(event.target.value);
      console.log("User pressed:", event.key);
    }
  };
  // const onChangeHandler = (searchTerm) => {
  //   let matches = [];
  //   console.log(searchTerm);
  //   if (searchTerm.length > 0) {
  //     matches = movies.filter((movie) => {
  //       const regex = new RegExp(`${searchTerm}`, "gi");
  //       setSuggestions(matches);
  //       setSearchTerm(searchTerm);
  //       return movie.Title.match(regex);
  //     });
  //     console.log("matches", matches);
  //   }
  // };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onKeyDown={(event) => onKeyDown(event)}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 100);
          }}
        />
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <div key={i} onClick={() => onSuggestHandler(suggestion.Title)}>
              {" "}
              {suggestions.Title}
            </div>
          ))}
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
