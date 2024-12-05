import {  useEffect, useState } from 'react';

import '../style/youtube.css'
import { useStore } from '../stateZustand/zustandState';


export function ListItemYoutube() {
  const [listVideoRecomended, setListVideoRecomeded] = useState([]);
  const { idActualVideoIframe } = useStore((state) => state);
  /*
  useEffect(() => {
    /*
    const apiKey = 'AIzaSyBmcw5S5OlPzyBe-CaQfAgrt0dHYpSTNyE';  // Reemplaza con tu clave de API válida
    const videoId = 'ViuFEnniUDc';  // Reemplaza con el ID del video para el cual quieres obtener videos relacionados
    const maxResults = 10;  // Número de resultados deseados

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${videoId}&key=${apiKey}&maxResults=${maxResults}`;
    const apiUrl2 = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${videoId}&key=${apiKey}&maxResults=${maxResults}`;
    fetch(apiUrl2)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        
        let listIdItemYoutube = []
        let listObjectItemYoutube = []
        data.items.forEach(video => {
          let title = video.snippet.title;
          let description = video.snippet.description;
          let thumbnail = video.snippet.thumbnails.high.url;
          let videoId = video.id.videoId;

          console.log('Título:', video.snippet.title);
          console.log('Descripción:', video.snippet.description);
          console.log('Miniatura URL:', video.snippet.thumbnails.high.url);
          console.log('Video URL: https://www.youtube.com/watch?v=' + video.id.videoId);
          listIdItemYoutube.push(video.id.videoId)
          listObjectItemYoutube.push({ title, description, thumbnail, videoId })
        });
        setItemRecomeded(listObjectItemYoutube);
        console.log(itemRecomended)
      })
      .catch(error => {
        console.error('Error al obtener videos relacionados:', error);
      });


      const url = 'https://yt-api.p.rapidapi.com/related?id=RVRLnCLIyjk';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'bc298b1a47msh719b80ee47579e4p13c84ajsn89664b62ad7c',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      };
      
try {

  fetch(url, options)
  .then((response)=>{
return response;
  })
  .then((data)=> {
    console.log(data.text())
  return   data.text()
  })
  .catch((error)=>{
console.error(error)
  })
	
	
} catch (error) {
  console.error(error);
}
  }, [])
*/
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
    <div className='list-music-youtube-iframe'>
      {/*
        itemRecomended &&
        itemRecomended.map((e, index) => (
         <ItemYoutube key={index + '$%&'}
         el={e} index={index} arrayList={itemRecomended} allow={true}/>
        ))*/
      }
      {listVideoRecomended &&
        listVideoRecomended.filter((videoRecomended) => (videoRecomended.type == 'video')).map((videoRecomended) => (
          <ItemYoutube key={videoRecomended.videoId + '$%&#'}
            videoItem={videoRecomended} />
        ))}
    </div>

  )
}

export function ItemYoutube({ videoItem }) {
  const { updateIdActualVideoIframe,updateObjectVideoActually } = useStore((state) => state)
  const { videoId, thumbnail: [{ url: smallThumbnail }], title, lengthText: timeVideo } = videoItem

  const handleMusic = () => {
    updateIdActualVideoIframe(videoId)
    updateObjectVideoActually(videoItem)
}

  return (
    <div className='list-item-container'
      onClick={handleMusic} >
      <img src={smallThumbnail} />
      <div className={`${'title-container'}`} >
        <h3 >{title}</h3>
      </div>

    </div>
  )
}