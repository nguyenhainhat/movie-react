import React, {useState, useEffect, useRef} from "react";
import "./episodes.scss";
// import 

import {Link, useLocation, useParams} from "react-router-dom";

import {embedMovie, embedEpisode} from "../../../api/constants";
import tmdbApi, {category as cate, movieType} from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import MoviesList from "../../../components/movies-list/MoviesList";

const Episodes = () => {
  const {id, season, episode} = useParams();
  // Được thừa hưởng từ season, episode trong Link của season và season được thừa hưởng ID ở page detail

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const response = await tmdbApi.getTvEpisodes(id, season, episode);
      setEpisodes(response);
      window.scrollTo(0, 0);
    };
    getEpisodes();
  }, [id, season, episode]);

  return (
    <>
      <WatchItem episodes={episodes} />
    </>
  );
};

export const WatchItem = (props) => {
  const [item, setItem] = useState([]);
  const [similar, setSimilar] = useState();
  const [resizeItem, setResizeItem] = useState(false)
  const { height, width } = useWindowDimensions()


  const episodeRef = useRef(null);
  const {category, id, season, episode} = useParams();
  const episodes = props.episodes ? props.episodes : "";
  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await tmdbApi.detail(category, id, {params});
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  useEffect(() => {
    const getSmilar = async () => {
      const params = {params: 1};
      const response = await tmdbApi.similar(category, id, {params});
      setSimilar(response.results.slice(0, 15));
      window.scrollTo(0, 0);
    };
    getSmilar();
  }, [category, id]);


  return (
    <div
      className="episode banner"
    >
      <div className="h-100"></div>
      <div className="container">
        <div className="episode_left">
          <iframe
            className="iframe"
            width="100%"
            height={"100%"}
            src={category === 'tv' ? embedEpisode(id, season, episode) : embedMovie(id)}
            title="Movie player"
            frameBorder="0"
            allowFullScreen></iframe>
          {category === "movie" ? (
            ""
          ) : (
            <div className="episode_left-title">
              {item.name} episode {episodes.episode_number} (Season {episodes.season_number})
            </div>
          )}
          <div className="episode_left-description">
            {category !== "movie"
              ? episodes.overview
              : `${item.title} (${new Date(
                  item.first_air_date || item.release_date
                ).getFullYear()})`}{" "}
          </div>
          {category !== "movie" && (
            <div className="episode_left-container">
              <span>Episode:</span>
              <div className="episode_left-content">
                {item !== undefined && item.seasons !== undefined ? (
                  <EpisodesItem id={id} item={item} category={category} seasons={season} />
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
        <div className="episode_right">
          {width >= 600 ? 
            <div className="episode_right-row" ref={episodeRef}>
              <h2>Similar</h2>
              {resizeItem ? 'abc' : 
              <div className="episode_right-container">
                {similar !== undefined &&
                  similar.map((item, i) => (
                    <ItemSimilar key={i} id={item.id} category={category} item={item} />
                  ))}
              </div>
              }
            </div>
          : category !==undefined && (
            <MoviesList category={category} type="similar" id={id} />
          )
          }
        </div>
      </div>
    </div>
  );
};

export const ItemSimilar = (props) => {
  const item = props.item;
  return (
    <Link to={`/${props.category}/${item.id}`} className="episode_right-link">
      <div className="episode_right-content">
        <div className="episode_right-content-img">
          <img
            src={`${apiConfig.w500Image(item.poster_path || item.backdrop_path)}`}
            alt={item.name}
          />
          <div className="vote">
            <span>{item.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className="episode_right-content-title">
          <h4>{item.name || item.title}</h4>
          <p>{new Date(item.first_air_date || item.release_date).getFullYear()}</p>
        </div>
      </div>
    </Link>
  );
};

const EpisodesItem = (props) => {
  const [seasons, setSeason] = useState([]);
  const {id} = useParams();
  const linkRef = useRef();
  const {pathname} = useLocation();

  let episodes = seasons.episodes;
  useEffect(() => {
    const getSeason = async () => {
      let response = await tmdbApi.season(props.id, props.seasons);
      setSeason(response);
    };
    getSeason();
  }, []);

  // Cách tối ưu Link

  // console.log(linkRef,pathname);

  return (
    <>
      {episodes !== undefined
        ? episodes.map((item, i) => {
            let linkItem = `/tv/${id}/watch/season/${item.season_number}/episodes/${item.episode_number}`;
            return item.season_number === seasons.season_number ? (
              <Link to={`${linkItem}`} className={pathname === linkItem ? "active" : ""} key={i}>
                <div className="episode_left-item" ref={linkRef.item}>
                  {item.episode_number}
                </div>
              </Link>
            ) : (
              ""
            );
          })
        : ""}
    </>
  );
};

export default React.memo(Episodes);
