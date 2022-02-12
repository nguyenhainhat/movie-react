import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import SwiperCore, {Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper";

import "./detail.scss";

const Season = (props) => {
  const items = props.item.seasons;

  return (
    <>
      <Swiper
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={"auto"}
        navigation={true}
        modules={[Navigation]}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            {({isActive}) => (
              <Link
                key={i}
                className={`${isActive ? "active" : ""}`}
                to={`watch/season/${item.season_number}`}>
                <div className="season">
                  <div className="season-item">
                    <img src={`${apiConfig.w500Image(item.poster_path)}`} alt={item.name} />
                    <div className="season-info">
                      <h2>{item.name}</h2>
                      <p>
                        {item.air_date} | {item.episode_count} Episodes
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

// const SeasonItem = (props) => {
//   const item = props.item;
//   const [season, setSeason] = useState([]);
//   const episodes = season.episodes;
//   const {category, id} = useParams();

//   useEffect(() => {
//     const getSeason = async () => {
//       let response = await tmdbApi.season(props.id, item.season_number);
//       setSeason(response);
//     };
//     getSeason();
//   }, []);

//   return (
//     <div className="season-episodes">
//       {episodes !== undefined ? (
//         <Swiper
//           grabCursor={true}
//           spaceBetween={10}
//           slidesPerView={"auto"}
//           navigation={true}
//           modules={[Navigation]}
//           onSlideChange={() => console.log("slide change")}
//           onSwiper={(swiper) => console.log(swiper)}>
//           {episodes.map((item, i) =>
//             item.still_path !== null ? (
//               // them nut next prev
//               <SwiperSlide key={i}>
//                 {({isActive}) => (
//                   <Link
//                    to={`episodes/${item.episode_number}`}
//                     className={`${isActive ? "active" : ""}`}>
//                     <div className="season-episodes_item">
//                       <img src={`${apiConfig.w300Image(item.still_path)}`} alt={item.name} />
//                       <div className="season-info">
//                         {item.name === `Episode ${item.episode_number}` ? (
//                           <h4>{item.name}</h4>
//                         ) : (
//                           <>
//                             <h4>{item.name}</h4>
//                             <p>Episode {item.episode_number}</p>
//                           </>
//                         )}
//                         <p>{item.air_date}</p>
//                       </div>
//                     </div>
//                   </Link>
//                 )}
//               </SwiperSlide>
//             ) : (
//               ""
//             )
//           )}
//         </Swiper>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

export default Season;
