import React, {useState, useEffect, useCallback} from "react";
import "./episodes.scss";

import {useNavigate, useParams} from "react-router-dom";

import {embedMovie, embedEpisode} from "../../../api/constants";
import tmdbApi, {category as cate, movieType} from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";

const Episodes = () => {
  const {category, id, season, episode} = useParams();

  const [episodes, setEpisodes] = useState([]);

  // watch/tv/id/season/sea_num/esp/num
  // watch/movie/id

  useEffect(() => {
    const getEpisodes = async () => {
      const response = await tmdbApi.getTvEpisodes(id, season, episode);
      setEpisodes(response);
      window.scrollTo(0, 0);
    };
    getEpisodes();
  }, []);

  return (
    <div
      className="banner"
      style={{backgroundImage: `url(${apiConfig.originalImage(episodes.still_path)})`}}>
      <div className="container mb-3">
        <iframe
          className="iframe"
          width="100%"
          height={"100%"}
          src={embedEpisode(id, season, episode)}
          title="Movie player"
          frameBorder="0"
          allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default Episodes;
