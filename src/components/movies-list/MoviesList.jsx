import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './moviesList.scss'

import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";


import tmdbApi, { category } from '../../api/tmdbApi'

import MoviesCard from '../movies-card/MoviesCard';

const MoviesList = (props) => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async() => {
      const params = {}
      let response = null;

      if(props.type !== 'similar'){
        switch(props.category){
          case category.movie: 
            response = await tmdbApi.getMoviesList(props.type, {params});
            break;
          default:
            response = await tmdbApi.getTvList(props.type, {params});
        }
      }else {
        response = await tmdbApi.similar(props.category, props.id)
      }

      setItems(response.results)
    }
    getList();
  },[])

  return <div className='movie-list'>
    <Swiper
      grabCursor={true}
      spaceBetween={20}
      slidesPerView={'auto'}
      pagination={true}
      modules={[Pagination]}
    >
      {
        items.map((item, i) => (
          <SwiperSlide key={i}>
            <MoviesCard item={item} key={i} category={props.category}/>
          </SwiperSlide>
        ))
      }
    </Swiper>
  </div>;
};

MoviesList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MoviesList;
