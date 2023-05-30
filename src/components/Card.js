import React from "react";
import "../styles/Card.css";
import noImage from "../assets/defaultImage.jpg";

function Card(props) {
  const imgPath = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div className="movieBox">
        <div className="imageContainer">
          <img
            className="card-img"
            src={
              props.info.poster_path
                ? imgPath + props.info.poster_path
                : noImage
            }
            alt="movie poster"
          />
        </div>
        <h4 className="description">
          {props.info.title ? props.info.title : props.info.name}
        </h4>

        <div className="rating_container">
          <div className="rating-text">Movie Rating:</div>
          <span className="rating">{props.info.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </>
  );
}
//{ title, vote_average, overview }
export default Card;
