import { useEffect, useState } from 'react';
import style from '../style/listItemYoutube.module.css'
import { useStore } from '../stateZustand/zustandState';
import { ItemYoutube } from './ItemYoutube';
import SwiperSliderMusic from './slider/SwiperSliderMusic';
export function ListItemYoutube() {
  const [listVideoRecomended, setListVideoRecomeded] = useState([]);
  const { idActualVideoIframe, objectVideoActually } = useStore((state) => state);
  const { title } = objectVideoActually;
  const [infoVideoPlaying, setInfoVideoPlaying] = useState({ infoVideo: '', infoChannel: '' })
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
      const urlYT2 = `https://youtube-data8.p.rapidapi.com/video/related-contents/?id=${idActualVideoIframe}&hl=en&gl=US`
      const optionsYT2 = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'bc298b1a47msh719b80ee47579e4p13c84ajsn89664b62ad7c',
          'x-rapidapi-host': 'youtube-data8.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(urlYT2, optionsYT2);
        const result = await response.json();
        console.log(result);
        console.log('result data:',result.contents)
        setListVideoRecomeded(result.contents)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const getInfoApiYoutube = () => {
      const apiKey = 'AIzaSyBmcw5S5OlPzyBe-CaQfAgrt0dHYpSTNyE'
      // Reemplaza con tu clave de API válida       // Palabra clave a buscar
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${idActualVideoIframe}&key=${apiKey}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Procesar y mostrar los resultados
          console.log('Resultados de búsqueda:', data);
          let listFecthYoutube = []

          data.items.forEach(item => listFecthYoutube.push(item))
          console.log('get infovideo: ', listFecthYoutube)
          setInfoVideoPlaying((state) => ({
            ...state, // Mantén el resto del estado
            infoVideo: listFecthYoutube[0] // Aquí suponemos que `item` es lo que quieres actualizar
          }));
        })
        .catch(error => {
          console.error('Error al obtener datos de YouTube API:', error);
        });
    }
    //getInfoApiYoutube();
  }, [idActualVideoIframe]);



  const ey = false;
  return (
    <div className={style.listMusicYoutubeIframe}>
      {listVideoRecomended &&
        listVideoRecomended.filter((videoRecomended) => (videoRecomended.type == 'video')).map((videoRecomended) => (
          <ItemYoutube key={videoRecomended.video.videoId + '$%&#'}
            videoItem={videoRecomended} />
        ))}
    </div>

  )
}

