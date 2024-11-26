import { useContext, useEffect, useRef, useState } from 'react';
import { MusicContext } from '../context/MusicContext';
import { ItemResultSearchYoutube } from './BackgroundSong';
import '../style/youtube.css'

let idUrl = 'tCuYbAf6igo';
let qualityImg = {
  default: 'default.jpg',
  mqdefault: 'mqdefault.jpg',
  hqdeafult: 'hqdefault.jpg',
  sddefault: 'sddefault.jpg',
  maxresdefault: 'maxresdefault.jpg',
};
let urlTumbnail = `https://img.youtube.com/vi/${idUrl}/${qualityImg.sddefault}`;


const YouTubePlayer = () => {
  const playerRef = useRef(null);
  // const [indexSong, setIndexSong] = useState(0);
  const { isPlaying, setIsPlaying, player, setPlayer, setProgress, urlSongs, indexSong, resultSearchYoutube } = useContext(MusicContext);
  //const [progress, setProgress] = useState(0);
  //const [volume, setVolume] = useState(50);
  const [listItem, setListItem] = useState([])

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(playerRef.current, {
        videoId: urlSongs[indexSong], // Primer video
        playerVars: { autoplay: 0, controls: 0 }, // Sin controles nativos
        events: {
          onReady: (event) => setPlayer(event.target),
          onStateChange: (event) => handleStateChange(event),
        },
      });
    };
    console.log("urlsongs")
  }, [urlSongs]);

  // Efecto para cambiar de video cuando indexSong cambia
  useEffect(() => {
    if (player) {
      player.loadVideoById(urlSongs[indexSong]); // Cambia el video sin recrear el reproductor
      setIsPlaying(false); // Pausa el video al cambiar
    }
  }, [indexSong, player, urlSongs]);

  //
  useEffect(() => {
    let interval;

    if (isPlaying && player) {
      interval = setInterval(() => {
        if (player && player.getDuration) {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          const progressPercentage = (currentTime / duration) * 100;
          setProgress(progressPercentage);
        }
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isPlaying, player]);

  const handleStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };



  return (
    <div className='youtube-player-iframe-container'>
      <div className='iframe-container'>
        <div id="youtube-iframe" ref={playerRef} ></div>
      </div>


      {/* Aqui va el iframe de youtube */}
     <ListItemYoutube/>
    </div>
  );
};

export default YouTubePlayer;



function ListItemYoutube() {
  const [itemRecomended, setItemRecomeded] = useState([]);
  const {urlSongs,indexSong} = useContext(MusicContext);
 
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
      const url = `https://yt-api.p.rapidapi.com/related?id=${urlSongs[indexSong]}`;
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
        setItemRecomeded(result.data)
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [urlSongs,indexSong]);
  
 
  
  return (
    <div className='list-music-youtube-iframe'>
      {
        itemRecomended &&
        itemRecomended.map((e, index) => (
         <ItemYoutube key={index + '$%&'}
         el={e} index={index} arrayList={itemRecomended} allow={true}/>
        ))
      }
    </div>

  )
}

 export function ItemYoutube({index,el,arrayList,allow}){
  const {setUrlSongs,setIndexSong,setMusicActually} = useContext(MusicContext);
  const [scrollingText,setScrollingText] = useState('')
  const itemRef = useRef();
  const h3Ref = useRef();

  useEffect(()=>{
    if(itemRef.current.scrollWidth < h3Ref.current.scrollWidth){
      setScrollingText('scrolling-text');
    }else{
      setScrollingText('');
    }
  },[])
  let indexItemYoutube = index;
  let listItem = [...arrayList]
  const handleMusic = () => {
    let idMusicYoutube= listItem.map((e)=>{
     return  e.videoId
    })
if(allow){
  console.log('idmusic',idMusicYoutube);
  setUrlSongs(idMusicYoutube);
  setIndexSong(indexItemYoutube);
  setMusicActually({title:el.title,thumbnail:`https://img.youtube.com/vi/${el.videoId}/${qualityImg.sddefault}`,})

}


  }
  let qualityImg = {
    default: 'default.jpg',
    mqdefault: 'mqdefault.jpg',
    hqdeafult: 'hqdefault.jpg',
    sddefault: 'sddefault.jpg',
    maxresdefault: 'maxresdefault.jpg',
  };
  return(
    <div className='list-item-container'
    
    onClick={handleMusic}
    >
            <img src={`https://img.youtube.com/vi/${el.videoId}/${qualityImg.sddefault}`} alt={`imagen de https://img.youtube.com/vi/${el.videoId}/${qualityImg.sddefault}`} />
            <div className={`${'title-container'}${scrollingText}`} ref={itemRef} >
            <h3 ref={h3Ref}>{el.title}</h3>
            </div>
            
          </div>
  )
}