import React, { useEffect, useState } from "react";
import axios from "axios";

import SingleContent from "../../components/SingleContent";
import CustomPagination from "../../components/Pagination";
import Genres from "../../components/Genres";
import useGenre from "../../hooks/useGenre";

const Movies = () => {
  const [page, setpage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumofpages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchmovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumofpages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchmovies();
  }, [page, genreforURL]);

  // // function onGenreClick(genreid)  {
  //
  // }

  return (
    <div>
      <span className="pagetitle">Movies </span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setpage={setpage}
      />
      <div className="trending">
        {content &&
          content.map((movieData) => {
            return (
              <SingleContent
                key={movieData.id}
                id={movieData.id}
                poster={movieData.poster_path}
                title={movieData.title || movieData.name}
                date={movieData.first_air_date || movieData.release_date}
                media_type="movie"
                vote_average={movieData.vote_average}
              />
            );
          })}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setpage={setpage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
