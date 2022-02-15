import React, {useState, useEffect, useRef} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import tmdbApi from "../../../api/tmdbApi";
import { WatchItem } from "../TV/Episodes";

const Movies = () => {
  // const [category, id] = useParams();
  return (
    <>
      <WatchItem/>
    </>
  )
}

export default Movies