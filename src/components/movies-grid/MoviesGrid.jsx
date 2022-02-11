import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import "./moviesGrid.scss";

import MoviesCard from "../movies-card/MoviesCard";
import Button, {OutlineButton} from "../button/Button";
import Input from "../input/Input";

import tmdbApi, {category, movieType, tvType} from "../../api/tmdbApi";

const MoviesGrid = (props) => {
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const {keyword} = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, {params});
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, {params});
      }
      setItems(response.results);
      setTotalPages(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;

    let params = {pages: pages + 1};

    let keyword = undefined;

    if (props.category) {
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(category.upcoming, {params});
          console.log(response);
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, {params});
      }
    } else {
      let params = {
        query: keyword,
        pages: pages + 1,
      };
      response = await tmdbApi.search(props.category, {params});
    }
    setItems([...items, ...response.results]);
    setPages(pages + 1);
  };
  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div>
        <div className="movie-grid">
          {items.map((item, i) => (
            <MoviesCard item={item} category={props.category} key={i} />
          ))}
        </div>
        {pages < totalPages ? (
          <div className="movie-grid_loadmore">
            <OutlineButton className="small" onClick={loadMore}>
              Load more
            </OutlineButton>
          </div>
        ) : null}
      </div>
    </>
  );
};

const MovieSearch = (props) => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(
    () => {
      if (keyword.trim().length > 0) {
        history(`/${category[props.category]}/search/${keyword}`);
      }
  }, 
    [keyword, props.category, history]
  );

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);
  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MoviesGrid;
