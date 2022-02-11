import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';

import HeroSlide from '../components/hero-slide/HeroSlide';
import MoviesList from '../components/movies-list/MoviesList';

import { category, movieType, tvType } from '../api/tmdbApi';

const Home = () => {
  return <div>
      <HeroSlide/>
      <div className="container">
        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2 style={{marginBottom: '10px'}}>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.movie} type={movieType.popular}/>
        </div>

        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2 style={{marginBottom: '10px'}}>Top Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.movie} type={movieType.top_rated}/>
        </div>

        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2 style={{marginBottom: '10px'}}>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.tv} type={tvType.popular}/>
        </div>

        <div className="section mb-3">
          <div className="section_header mb-2">
            <h2 style={{marginBottom: '10px'}}>Top Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MoviesList category={category.tv} type={tvType.top_rated}/>
        </div>
      </div>
  </div>;
};

export default Home;
