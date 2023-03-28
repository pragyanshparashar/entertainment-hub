import axios from "axios";
import React, { useEffect, useState } from "react";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination";
import SingleContent from "../../components/SingleContent";
import useGenres from "../../hooks/useGenre";

const Series = () => {
  const [page, setpage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumofpages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const fetchmovies = async () => {
    const { data } = await axios.get(
      `
      https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );

    setContent(data.results);
    setNumofpages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchmovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="pagetitle">TV Series</span>
      <Genres
        type="tv"
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
                media_type="tv"
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

export default Series;
