import { useEffect, useState } from 'react';
import style from '../style/listItemYoutube.module.css'
import { useStore } from '../stateZustand/zustandState';
import { ItemYoutube } from './ItemYoutube';
import SwiperSliderMusic from './slider/SwiperSliderMusic';
export function ListItemYoutube() {
  const [listVideoRecomended, setListVideoRecomeded] = useState([]);
  const { idActualVideoIframe, objectVideoActually ,colorControlerPlayer} = useStore((state) => state);
  const { title } = objectVideoActually;
  const [infoVideoPlaying, setInfoVideoPlaying] = useState({ infoVideo: '', infoChannel: '' })
  const formatColorRgb = (array) =>{
    return `linear-gradient(180deg, rgba(${array[0]},${array[1]},${array[2]},1) 0%, rgba(24,24,23,1) 80%)`
  //return `rgb(${array[0]},${array[1]},${array[2]})`
  }
  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`https://api-youtube-player.onrender.com/videos-related?id=${idActualVideoIframe}`);
        const result = await response.json();
        console.log('resulta.data: ',result.data);
        setListVideoRecomeded(result.data)
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


  const videos = [
    {
        type: "video",
        videoId: "Tyd4A_L75NE",
        title: "Rede von Christian Lindner zur Vertrauensfrage von Olaf Scholz am 16.12.24",
        lengthText: "11:41",
        viewCount: "86350",
        publishedTimeText: "9 hours ago",
        thumbnail: [
            {
                url: "https://i.ytimg.com/vi/Tyd4A_L75NE/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCze_dQ4unu5mPahmib-QA6vf5J5w",
                width: 168,
                height: 94
            },
            {
                url: "https://i.ytimg.com/vi/Tyd4A_L75NE/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBznPOGuvy2JvZ0jlhvkBN1pByE5g",
                width: 336,
                height: 188
            }
        ],
        channelTitle: "phoenix",
        channelId: "UCwyiPnNlT8UABRmGmU0T9jg",
        authorThumbnail: [
            {
                url: "https://yt3.ggpht.com/Z8hNO57BolkhiNu-nWUuQ6h_WCwH8k11LBVEfBbjKtIabNMogzbFQ8Jjr0YS3Kr0B-7g6kk-Dw=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68
            }
        ]
    },
    {
        type: "video",
        videoId: "5it_Uv7pGFg",
        title: "Top 100 React JS Interview Questions and Answers | 2024",
        lengthText: "2:38:03",
        viewCount: "46341",
        publishedTimeText: "4 months ago",
        thumbnail: [
            {
                url: "https://i.ytimg.com/vi/5it_Uv7pGFg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCPUrj0nQrsFzCH9EzwTRNU82FQVg",
                width: 168,
                height: 94
            },
            {
                url: "https://i.ytimg.com/vi/5it_Uv7pGFg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDKLROKA9yiFaNg0ZIeJJsSdjlWRQ",
                width: 336,
                height: 188
            }
        ],
        channelTitle: "Sangam Mukherjee",
        channelId: "UCuWZvXIeoDzZKCzpTuC5krQ",
        authorThumbnail: [
            {
                url: "https://yt3.ggpht.com/b9HKo3FrJx9_tKoegQQEku8zOXfQY1tQIVDlkzjnQa6NCchtOgLppCmedmrAgKEOznwu_FHfeQ=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68
            }
        ]
    },
    {
        type: "video",
        videoId: "-Y8brhQKvtA",
        title: "Zustand Beginner Tutorial - Learn React State Management With Zustand",
        lengthText: "30:12",
        viewCount: "30728",
        publishedTimeText: "9 months ago",
        thumbnail: [
            {
                url: "https://i.ytimg.com/vi/-Y8brhQKvtA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBetvIRP2bXh2BQj8njxVrkQfB3rg",
                width: 168,
                height: 94
            },
            {
                url: "https://i.ytimg.com/vi/-Y8brhQKvtA/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8rW8Gn8t59pXQNutWRFBU3ONJwA",
                width: 336,
                height: 188
            }
        ],
        channelTitle: "PedroTech",
        channelId: "UC8S4rDRZn6Z_StJ-hh7ph8g",
        authorThumbnail: [
            {
                url: "https://yt3.ggpht.com/KydTS7_isLNxNs3UguRxSZdRQ_gPoOK11ipFsUcjD-pW_8LoFB9K2QKrNl0LrIqlMV5QIyj-i5Q=s68-c-k-c0x00ffffff-no-rj",
                width: 68,
                height: 68
            }
        ]
    },
    //... (more video objects)
];

  
  return (
    <div className={style.listMusicYoutubeIframe} 
    style={{background:colorControlerPlayer ? `${formatColorRgb(colorControlerPlayer)}`:'white'}}
    >
      {listVideoRecomended &&
        listVideoRecomended.filter((videoRecomended) => (videoRecomended.type == 'video')).map((videoRecomended) => (
          <ItemYoutube key={videoRecomended.videoId + '$%&#'}
            videoItem={videoRecomended} />
        ))}
        
    </div>

  )
}

