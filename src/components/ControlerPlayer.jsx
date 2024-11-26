import { useContext, useEffect, useState } from "react"
import "../style/controlerPlayer.css"
import { BotonShowMusicPlayer } from "./PlaySong"
import { MusicContext } from "../context/MusicContext"
import BotonPlayYoutube from "./BotonPlayYoutube"
import { ItemResultSearchYoutube } from "./BackgroundSong"
import { ItemYoutube } from "./Youtube"

export default function ControlerPlayer() {

  return (
    <div className="controler-player-container">

      <BarProgressYoutube />
      <div className="controler-player">
        <div className="btns-controler-primary">
          <BotonBackYoutube />
          <BotonPlayYoutube />
          <BotonNextYoutube />
        </div>
        <SongActually/>
        <div className="btns-controler-secundary">
          <BotonVolumeYoutube />
          <BotonShowMusicPlayer />
        </div>

      </div>

    </div>
  )
}
function SongActually(){
  const { resultSearchYoutube,indexSong ,musicActually} = useContext(MusicContext)
  const [songActually, setSongActually] = useState({})
  useEffect(() => {
    setSongActually(musicActually)
    console.log('probando el valor de musicActuallly: ',musicActually)
    /**
     * queda como issue
     * actualizar el estado de listItem 
     * para que sincronize el {} del video actual 
     * que se esta reproduciendo
     * tenemos que optimizar el estado 
     * para su facil actualizacion 
     * 
     */
  }, [musicActually])
  let qualityImg = {
    default: 'default.jpg',
    mqdefault: 'mqdefault.jpg',
    hqdeafult: 'hqdefault.jpg',
    sddefault: 'sddefault.jpg',
    maxresdefault: 'maxresdefault.jpg',
  };
  return(
    <div className="song-actually-container">
          <div className='list-item-container'
          onClick={()=>{
            console.log(songActually.title)
          }}
          >
            <img src={songActually.thumbnail} alt={songActually.thumbnail} />
            <h3>{songActually.title}</h3>
          </div>
        </div>
  )
}
function CambiaLista() {

  const { setUrlSongs, setIndexSong } = useContext(MusicContext);

  useEffect(() => {
    const apiKey = 'AIzaSyBmcw5S5OlPzyBe-CaQfAgrt0dHYpSTNyE'
    // Reemplaza con tu clave de API válida
    const query = 'pollo';        // Palabra clave a buscar
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=5`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Procesar y mostrar los resultados
        let listSongs = [];
        console.log('Resultados de búsqueda:', data);

        data.items.forEach(item => {
          const videoId = item.id.videoId;
          listSongs.push(videoId);
          const title = item.snippet.title;
          const description = item.snippet.description;
          const thumbnail = item.snippet.thumbnails.default.url;
          const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

          // Mostrar la información en la consola
          console.log('Título:', title);
          console.log('Descripción:', description);
          console.log('Miniatura:', thumbnail);
          console.log('URL del Video:', videoUrl);
          console.log('---');
        });
        setUrlSongs(listSongs)
      })
      .catch(error => {
        console.error('Error al obtener datos de YouTube API:', error);
      });
  }, [])
  return (
    <div className="btn-cambialista-contianer">
      <button
        onClick={() => {

          setUrlSongs(listSongs)
          setIndexSong(0)
        }}
      >
        cambia lista
      </button>
    </div>
  )
}
export function BarProgressYoutube() {
  const { progress, player } = useContext(MusicContext);
  const handleProgressClick = (e) => {
    e.stopPropagation();
    const progressBar = e.target;
    const clickPosition = e.nativeEvent.offsetX / progressBar.offsetWidth;
    const newTime = player.getDuration() * clickPosition;
    player.seekTo(newTime);
  };
  return (
    <div className="bar-progress-youtube-container">
      <div
        className='background-progress-bar'
        onClick={handleProgressClick}
        style={{
          width: '100%',
          height: '100%',

          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <div
          className='progress-bar'
          style={{
            width: `${progress}%`,
            height: '100%',

          }}
        > </div>
      </div>
    </div>
  )
}

function BotonMuteYoutube() {
  return (
    <></>
  )
}

function BotonVolumeYoutube() {
  const { volume, setVolume, player } = useContext(MusicContext)
  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (player) {
      player.setVolume(volume);
    }
  };
  return (
    <div className="volume-youtube-container">
      <label htmlFor="volumeControl">
        Volume: {volume}%
      </label>
      <br />
      <input
        id="volumeControl"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        style={{ width: 'auto', color: 'crimson' }}
      />
    </div>
  )
}
function BotonNextYoutube() {
  const { urlSongs, setIndexSong, indexSong } = useContext(MusicContext);
  return (
    <button className="btn"
      onClick={() => {
        if (indexSong < urlSongs.length - 1) {
          setIndexSong((i) => i + 1);
        }
      }}
    >
      <i className="fa-solid fa-forward"></i>
    </button>
  )
}
function BotonBackYoutube() {
  const { urlSongs, setIndexSong, indexSong } = useContext(MusicContext);
  return (
    <button className="btn"
      onClick={() => {
        if (indexSong > 0) {
          setIndexSong((i) => i - 1);
        }
      }}
    >
      <i className="fa-solid fa-backward"></i>
    </button>
  )
}
