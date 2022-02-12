import React, {useState, useEffect, useCallback, useLayoutEffect, useRef} from "react";
import "./episodes.scss";

import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

import {embedMovie, embedEpisode} from "../../../api/constants";
import tmdbApi, {category as cate, movieType} from "../../../api/tmdbApi";
import apiConfig from "../../../api/apiConfig";

const Episodes = () => {
  const {category, id, season, episode} = useParams();
  // Được thừa hưởng từ season, episode trong Link của season và season được thừa hưởng ID ở page detail

  const [episodes, setEpisodes] = useState([]);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const response = await tmdbApi.getTvEpisodes(id, season, episode);
      setEpisodes(response);
      window.scrollTo(0, 0);
    };
    getEpisodes();
  }, [id, season, episode]);

  useEffect(() => {
    const getDetail = async () => {
      const params = {};
      const response = await tmdbApi.detail(category, id, {params});
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  // console.log(item.seasons, season)

  return (
      <div>a</div>
    // <div
    //   className="banner"
    //   style={{backgroundImage: `url(${apiConfig.originalImage(episodes.still_path)})`}}>
    //   <div className="container mb-3">
    //     {/* <iframe
    //       className="iframe"
    //       width="100%"
    //       height={"100%"}
    //       src={embedEpisode(id, season, episode)}
    //       title="Movie player"
    //       frameBorder="0"
    //       allowFullScreen></iframe> */}
    //   </div>
    //   <div className="episode-container">
    //   episode: 
    //     {item !== undefined && item.seasons !== undefined ? (
    //       <EpisodesItem id={id} item={item} seasons={season} />
    //     ) : (
    //       ""
    //     )}
    //   </div>
    // </div>
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
              <Link
              to={`${linkItem}`}
              className={ pathname === linkItem ? 'active' : ''}
                key={i}>
                <div className='episodes-item' ref={linkRef.item}>
                  {item.episode_number}
                </div>
              </Link>
            ) : (
              ""
              )
            })
          : ""}
    </>
  );
};

export default React.memo(Episodes);
