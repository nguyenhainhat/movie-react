export const TMDB_IMAGE = "https://image.tmdb.org/t/p/";
export const TMDB_API = "https://api.themoviedb.org/3";
export const originalImage = "https://image.tmdb.org/t/p/original";
export const w500Image = "https://image.tmdb.org/t/p/w500";
export const w200Image = "https://image.tmdb.org/t/p/w200";
export const w300Image = "https://image.tmdb.org/t/p/w300";
export const embedMovie = (id) =>
  `https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
export const embedEpisode = (id, season, episode) =>
  `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`;