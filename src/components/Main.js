import React, { useEffect, useState } from "react";
import "../styles/Main.css";
import { BiSearch } from "react-icons/bi";
import Card from "../components/Card";
import { BsBrightnessHighFill } from "react-icons/bs";
import { WiMoonWaxingCrescent3 } from "react-icons/wi";
import { GiHamburgerMenu } from "react-icons/gi";
import ReactPaginate from "react-paginate";

function Main() {
  const API_KEY = "&api_key=b7347f16d4599e6486e1bce35a5f967f";
  const base_url = "https://api.themoviedb.org/3";
  let url = base_url + "/movie/popular?language=en-US&page=1" + API_KEY;
  const [movies, setMovies] = useState([]);
  let [url_set, setUrl] = useState(url);
  const [searchText, setSearchText] = useState({
    searchMovies: "",
  });
  const navArr = [
    "Now Playing",
    "Popular",
    "Top Rated",
    "Upcoming",
    "TV Series",
  ];

  const [pageNumber, setPageNumber] = useState(0);
  let resultPerPage = 8;
  if (window.innerWidth <= 1248) resultPerPage = 6;
  const pagesVisited = pageNumber * resultPerPage;
  let pageCount = Math.ceil(url_set.length / 50);
  if (window.innerWidth <= 1248) pageCount = Math.ceil(url_set.length / 30);

  const searchMovies = function (e) {
    const { name, value } = e.target;
    setSearchText((prev) => ({ ...prev, [name]: value }));
  };

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetch(url_set)
      .then((res) => {
        if (!res.ok) throw Error("Opps! connection problem 💥");
        return res.json();
      })
      .then(
        (data) =>
          setMovies(
            data.results.slice(pagesVisited, pagesVisited + resultPerPage)
          ) // returns 8 results per page
      )
      .catch((err) => setErrorMsg("Opps! connection problem 💥"));
  }, [url_set, pagesVisited, resultPerPage]);

  // see react paigination documentation

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const url = `${base_url}/search/movie?api_key=b7347f16d4599e6486e1bce35a5f967f&query=${searchText.searchMovies}`;
    setUrl(url);
  };

  const movieCategory = function (movie) {
    if (movie === "Now Playing") {
      const url =
        base_url + "/movie/now_playing?language=en-US&page=1" + API_KEY;
      setUrl(url);
    }
    if (movie === "Popular") {
      const url = base_url + "/tv/popular?language=en-US&page=1" + API_KEY;
      setUrl(url);
    }
    if (movie === "Top Rated") {
      const url = base_url + "/movie/top_rated?language=en-US&page=1" + API_KEY;
      setUrl(url);
    }
    if (movie === "Upcoming") {
      const url = base_url + "/movie/upcoming?language=en-US&page=1" + API_KEY;
      setUrl(url);
    }
    if (movie === "TV Series") {
      const url = base_url + "/tv/top_rated?language=en-US&page=1" + API_KEY;
      // /tv/airing_today?language=en-US&page=1
      // /tv/on_the_air?language=en-US&page=1
      // /tv/popular?language=en-US&page=1
      // /tv/top_rated?language=en-US&page=1

      setUrl(url);
    }
  };

  //bright-dark logic
  const [bright, setBright] = useState(true);
  const handleMode = function () {
    setBright((prev) => !prev);
  };

  //menu-bar display logic
  const [show, setShow] = useState(false);
  const handleMenuBar = function () {
    if (document.documentElement.clientWidth <= 1120) {
      return { left: show && "4rem" };
    }
  };

  return (
    <div
      className="overallContainer"
      style={{ background: !bright ? "#f5f6f8" : "" }}
    >
      <div className="container">
        <GiHamburgerMenu
          onClick={() => setShow((prev) => !prev)}
          size={30}
          className="menuIcon"
          style={{ color: !bright ? "black" : "" }}
        />

        <div
          className="nav-text"
          style={handleMenuBar()}
          onClick={(prev) => setShow(!prev)}
        >
          {navArr.map((el, i) => (
            <a
              // #495057
              style={{ color: !bright ? "#171a1d" : "" }}
              href="##"
              className="nav-text-link"
              name={el}
              key={i}
              onClick={(e) => movieCategory(e.target.name)}
            >
              {el}
            </a>
          ))}
        </div>

        <div className="dark-bright_container">
          <BsBrightnessHighFill size={15} color="white" />
          <div
            className="toggle"
            style={{ right: bright ? "0" : "" }}
            onClick={handleMode}
          ></div>
          <WiMoonWaxingCrescent3 size={20} color="white" />
        </div>

        <form
          className="formContainer"
          onSubmit={handleSubmit}
          style={{ border: !bright ? "2px solid black" : "" }}
        >
          <input
            style={{ color: !bright ? "black" : "" }}
            type="text"
            className="search-container"
            placeholder="Enter Movie name"
            value={searchText.name}
            name="searchMovies"
            onChange={searchMovies}
          />
          <button className="searchButton">
            <BiSearch size={25} color={!bright ? "black" : ""} />
          </button>
        </form>
      </div>
      {/*  */}
      <div className="main-container">
        {errorMsg && <p className="status-message">{errorMsg}</p>}
        {movies.length === 0 ? (
          <p className="status-message">Movie not found</p>
        ) : (
          movies.map((el, i) => <Card info={el} key={i} />)
        )}
      </div>

      <ReactPaginate
        // breakLabel="..."
        onPageChange={handlePageClick}
        pageCount={pageCount}
        nextLabel="next >"
        previousLabel="< previous"
        nextLinkClassName="nextButton"
        previousLinkClassName="prevButton"
        containerClassName="buttonContainer"
        activeClassName="activeButton"
        // breakLinkClassName="break"
      />
    </div>
  );
}

export default Main;
