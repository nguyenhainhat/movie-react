import {TMDB_API, originalImage, w500Image, embedMovie, w200Image, w300Image } from "./constants"

const apiConfig = {
    baseUrl: TMDB_API,
    apiKey: 'fa49d724bcd548b38b24b7c2ec1e00bd',
    originalImage: (imgPath) => originalImage + `${imgPath}`,
    w500Image: (imgPath) =>  w500Image + `${imgPath}`,
    w200Image: (imgPath) =>  w200Image + `${imgPath}`,
    w300Image: (imgPath) =>  w300Image + `${imgPath}`,
    // embedMovie: (id) => embedMovie + `${id}`
}

export default apiConfig