import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination";
import SingleContent from "../../components/SingleContent";
import "./Trending.css";

const Trending = () => {
  const [page, setpage] = useState(1);
  const [content, setContent] = useState([]);
  const fetchtrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );
    setContent(data.results);
  };

  useEffect(() => {
    fetchtrending();
  }, [page]);
  return (
    <div>
      <span className="pagetitle">trending</span>
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
                media_type={movieData.media_type}
                vote_average={movieData.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination setpage={setpage} />
    </div>
  );
};

export default Trending;
