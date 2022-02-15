import React from "react";

import {Route, Routes, Outlet} from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import NotFound from "../pages/NotFound";
import Episodes from "../pages/watch/TV/Episodes";
import PageEpisodes from "../pages/watch/TV/PageEpisodes";
import Movies from "../pages/watch/movies/Movies";

const Router = () => {
  return (
    <Routes>
        <Route index path="/" element={<Home />}/>
        <Route path='*' element={<NotFound/>} />
        <Route path=":category" element={<Catalog />}>
          <Route path="search/:keyword" element={<Catalog />} />
        </Route>
        <Route path=":category/:id" element={<Detail />}/>
        <Route path=":category/:id/watch" element={<Movies />}/>
        <Route path=":category/:id/watch/season/:season" element={<PageEpisodes />}/>
        <Route path=":category/:id/watch/season/:season/episodes/:episode" element={<Episodes />}/>
    </Routes>
  );
};

export default Router;
