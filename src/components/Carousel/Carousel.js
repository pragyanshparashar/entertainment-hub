import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import { noPicture } from "../../config/config";
import { img_300 } from "../../config/config";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
];

const Gallery = ({ media_type, id }) => {
  const [credits, setCredits] = useState();

  const items = credits?.map((movieData) => (
    <div className="carouselitem">
      <img
        src={
          movieData.profile_path
            ? `${img_300}/${movieData.profile_path}`
            : noPicture
        }
        alt={movieData?.name}
        onDragStart={handleDragStart}
        className="carouselitem_img"
      />
      <b className="carouselitem_txt">{movieData?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCarousel = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  return (
    <AliceCarousel
      responsive={responsive}
      disableButtonsControls
      disableDotsControls
      mouseTracking
      items={items}
    />
  );
};

export default Gallery;
