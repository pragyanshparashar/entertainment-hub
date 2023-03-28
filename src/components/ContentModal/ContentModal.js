import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Carousel from "../Carousel/Carousel";
import "./ContentModal.css";

import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 550,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
  "@media (max-width:600px)": {
    width: 400,
    height: 600,
  },
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    console.log(response, "axios-response");

    setContent(response.data);
  };

  console.log(content);

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, [media_type, id]);

  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "space-between",
                  backgroundColor: "black",
                }}
                className="contentModal"
              >
                <div
                  className="imageContentModal"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    height: 200,
                    width: "100%",
                  }}
                >
                  <img
                    style={{
                      height: 218,
                      width: 500,
                      position: "absolute",
                      top: "-0px",
                      margin: "10px",
                    }}
                    alt={content.name || content.title}
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                  />
                </div>

                <div className="contentModal_about">
                  <span className="contentModal_title">
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "_ _ _ _ _"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline"> {content.tagline} </i>
                  )}
                  <span style={{}}>{content.overview}</span>
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <div className="trailer-btn">
                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="secondary"
                      target="_blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                    >
                      Watch the Trailer
                    </Button>
                  </div>
                  <Button
                    style={{
                      visibility: "hidden",
                      "@media (max-width: 100px)": {
                        visibility: "visible",
                      },
                    }}
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </>
  );
}
