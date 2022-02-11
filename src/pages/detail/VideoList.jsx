import React, { useEffect, useRef, useState } from 'react';

import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";
import {useParams} from "react-router-dom";

const VideoList = (props) => {
    const {category} = useParams();
    const [video, setVideo] = useState([])

    useEffect(() => {
        const getVideo = async () => {
            let response = null;
            response = await tmdbApi.getVideos(category, props.id)
            setVideo(response.results.slice(0,5))
        }
        getVideo();
    },[])



  return <>
    {
        video.map((item, i) => (
            <Video key={i} item={item} />
        ))
    }
  </>;
};

const Video = props => {

    const item = props.item

    const iframeRef = useRef(null);

    // dùng useRef cho thẻ và lấy được thẻ đó sẽ không cần dùng document.querySelector để set thêm thuộc tín

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
        iframeRef.current.setAttribute('height', height)
    },[])

    return (
        <div className="video">
            <div className="video_title">
                <h3>{item.name}</h3>
            </div>
            <iframe className='video_iframe' src={`https://www.youtube.com/embed/${item.key}`} ref={iframeRef} width="100%" title={item.title} frameBorder="0"></iframe>
        </div>
    )
}


export default VideoList;
