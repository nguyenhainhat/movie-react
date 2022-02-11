import React, {useCallback, useEffect, useState} from "react";

import CastList from "./CastList";
import VideoList from "./VideoList";
import MoviesList from "../../components/movies-list/MoviesList";

import {useNavigate, useParams} from "react-router-dom";

import tmdbApi, {category as cate, movieType} from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import Season from "./Season";
import Button, {OutlineButton} from "../../components/button/Button";
import {TrailerModal} from "../../components/hero-slide/HeroSlide";

const Detail = () => {
  const {category, id} = useParams();
  const [item, setItem] = useState(null);
  const [video, setVideo] = useState([])

  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await tmdbApi.detail(category, id, {params});
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  let history = useNavigate();
  // Lấy link cũ và thêm link mới: movie/123 + /watch

  // const item = props.item;
  // Phải truyền props thì mới tạo biến để lấy dữ liệu hình ảnh như component MoviesCard
  useEffect(() => {
    const getMovies = async () => {
      const params = {page: 1};
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {params});
        setVideo(response.results.slice(0, 4));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  const setModalActive = useCallback(async() => {
    const modal = document.querySelector('.modal');
    modal.setAttribute("id", `modal_${id}`)
    const modalId = document.querySelector(`#modal_${id}`);

    const videos = await tmdbApi.getVideos(cate.movie, id);

    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modalId.querySelector(".modal_content iframe").setAttribute("src", videoSrc);
    } else {
      modalId.querySelector(".modal_content p").innerHTML = "No trailer";
    }
    modalId.classList.toggle("active");
  },[]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}></div>
          {video.map((items, i) => (
            <TrailerModal key={i} item={items} />
          ))}
          <div className="mb-3 movie-content container">
            <div className="movie-content_poster">
              <div
                className="movie-content_poster_img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}></div>
            </div>
            <div className="movie-content_info">
              <div className="title">{item.title || item.name}</div>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres_item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="btns">
                <Button onClick={() => {category === 'tv' ?  history('watch/season/1/episode/1') :  history('watch')}}>Watch Now</Button>
                <OutlineButton onClick={setModalActive}>Watch trailer</OutlineButton>
              </div>
              <div className="cast">
                <div className="section_header">
                  <CastList id={item.id} />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            {category === "tv" ? (
              <div className="section mb-3">
                <h2 className="mb-1">Current Season</h2>
                <Season id={item.id} item={item} />
              </div>
            ) : (
              ""
            )}
            <div className="section mb-3 videoList">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section_header mb-2">
                <h2>Similar</h2>
                <MoviesList category={category} type="similar" id={item.id} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
