import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import axios from "axios";
import CustomPagination from "../../components/Pagination";
import SingleContent from "../../components/SingleContent";
const Search = () => {
  const [types, setTypes] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#e91e63",
      },
    },
  });

  // https://api.themoviedb.org/3/search/company?api_key=5a93de3daa5b86b267227bc15f2caa1e&page=1

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${types ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [types, page, searchText]);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div>
          <span className="pagetitle">
            <TextField
              style={{ flex: 1 }}
              className="SearchBox"
              label="search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              onClick={fetchSearch}
              variant="contained"
              style={{ marginLeft: 10 }}
            >
              <FindInPageIcon />
            </Button>
          </span>
          <Tabs
            value={types}
            style={{ paddingBottom: 15 }}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setTypes(newValue);
              setPage(1);
            }}
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
          </Tabs>
        </div>
      </ThemeProvider>
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
                media_type={types ? "tv" : "movie"}
                vote_average={movieData.vote_average}
              />
            );
          })}
        {searchText &&
          content.length === 0 &&
          (types ? <h2>No Series found</h2> : <h2>No Movies found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setpage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
