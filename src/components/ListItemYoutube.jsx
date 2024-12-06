import {  useEffect, useState } from 'react';
import style from '../style/listItemYoutube.module.css'
import { useStore } from '../stateZustand/zustandState';
import { ItemYoutube } from './ItemYoutube';

export function ListItemYoutube() {
  const [listVideoRecomended, setListVideoRecomeded] = useState([]);
  const { idActualVideoIframe ,objectVideoActually} = useStore((state) => state);
  const { title } = objectVideoActually;
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://yt-api.p.rapidapi.com/related?id=${idActualVideoIframe}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'bc298b1a47msh719b80ee47579e4p13c84ajsn89664b62ad7c',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setListVideoRecomeded(result.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [idActualVideoIframe]);



  return (
    <div className={style.listMusicYoutubeIframe}>
      <div className={style.descriptionVideoActualContainer}>
        <figure className={style.imageContainer}>
          <img src= {''}
          alt="" />
        </figure>
        <div className={style.description}>
        <h3>{title}</h3>
        <p>54M</p>
        </div>
      </div>
      {listVideoRecomended &&
        listVideoRecomended.filter((videoRecomended) => (videoRecomended.type == 'video')).map((videoRecomended) => (
          <ItemYoutube key={videoRecomended.videoId + '$%&#'}
            videoItem={videoRecomended} />
        ))}
    </div>

  )
}

