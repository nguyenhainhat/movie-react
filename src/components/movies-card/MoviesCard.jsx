import React from "react";

import "./moviesCard.scss";

import {Link, useLocation, useParams} from "react-router-dom";

import Button from "../button/Button";

import {category} from "../../api/tmdbApi";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import Detail from "../../pages/detail/Detail";

const MoviesCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <>
    <Link to={link}>
      <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
        <h3>{item.title || item.name}</h3>
      </div>
    </Link>
    </>
  );
};

export default MoviesCard;
