import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setpage,
  type,
}) => {
  const handleAddGenres = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setpage(1);
  };

  const handleDeleteGenres = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );

    setGenres([...genres, genre]);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };
  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, [type]);

  return (
    <div style={{ padding: "6px 0px" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            key={genre.id}
            color="secondary"
            size="small"
            clickable
            onDelete={() => handleDeleteGenres(genre)}
          />
        ))}
      {genres.length > 0 &&
        genres.map((genre) => (
          <Chip
            label={genre.name}
            style={{ margin: 2 }}
            key={genre.id}
            size="small"
            color="primary"
            clickable
            onClick={() => handleAddGenres(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
