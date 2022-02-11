import React, {useEffect, useState} from "react";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import {useParams} from "react-router-dom";

const CastList = (props) => {
  const {category} = useParams();
    // params: link đường dẫn trang : .../movie/....

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      let response = null;
      response = await tmdbApi.credits(category, props.id);
      setCasts(response.cast.slice(0, 6));
      console.log(casts)
    };
    getCredits();
  }, []);

  return (
    <div className="casts">
      {casts.map((item, i) => (
        <div key={i} className="casts_item">
          <div
            className="casts_item_img"
            style={{
              backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`,
            }}></div>
            <p className="casts_item_name">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CastList;
