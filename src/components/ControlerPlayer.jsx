import { useContext, useEffect ,useState} from "react"
import "../style/controlerPlayer.css"
import { BotonShowMusicPlayer } from "./PlaySong"
import { MusicContext } from "../context/MusicContext"
import BotonPlayYoutube from "./BotonPlayYoutube"
import { useStore } from "../stateZustand/zustandState"


export default function ControlerPlayer() {
  const { isMoved, setIsMoved } = useContext(MusicContext)
  const {colorControlerPlayer} = useStore()
  const formatColorRgb = (array) =>{
   // return `linear-gradient(180deg, rgba(${array[0]},${array[1]},${array[2]},1) 20%, rgba(24,24,23,1) 100%)`
  return `rgb(${array[0]},${array[1]},${array[2]})`
  }
  return (
    <div className="controler-player-container"
    onClick={()=>{
      setIsMoved(!isMoved)
    }}
    style={{background:colorControlerPlayer ? `${formatColorRgb(colorControlerPlayer)}`:'white'}}
    >

      <BarProgressYoutube />
      <div className="controler-player">
      {/*<div className="btns-controler-secundary">
          <BotonVolumeYoutube />
          <BotonShowMusicPlayer />
        </div> */}
      <SongActually/>
        <div className="btns-controler-primary">
          <BotonBackYoutube />
          <BotonPlayYoutube />
          <BotonNextYoutube />
        </div>
        


      </div>

    </div>
  )
}
function SongActually(){
  const {objectVideoActually,updateColorControlerPlayer} = useStore((state)=> state);
  
  const { 
     thumbnail: [{ url: smallThumbnail }],
      title,
        } = objectVideoActually;


   useEffect(()=>{
    const getImageColor = async (imageUrl) => {
      try {
        const response = await fetch(`https://api-youtube-player.onrender.com/color-image?url=${imageUrl}`);
        if (!response.ok) {
          throw new Error('Error al obtener el color de la imagen');
        }
    
        const data = await response.json();
        console.log('Color dominante:', data);
        updateColorControlerPlayer(data.pallete[0])
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    // Llama a la función con la URL de la imagen
    getImageColor(smallThumbnail);
    
   },[smallThumbnail])

 
  return(
    <div className="song-actually-container">
          <div className='list-item-container'
          onClick={()=>{
            console.log(objectVideoActually)
          }}
          >
            <img  src={smallThumbnail} alt={title}
             />
            <div className="text-music-container">
            <span
            className={title.length > 15 ? 'textAnimation':''}
            >{title}</span>
            </div>
            
          </div>
        </div>
  )
}

export function BarProgressYoutube() {
  const { progress } = useContext(MusicContext);
  const {referenceIframe} = useStore((state)=> state);
  const handleProgressClick = (e) => {
    e.stopPropagation();
    const progressBar = e.target;
    const clickPosition = e.nativeEvent.offsetX / progressBar.offsetWidth;
    const newTime = referenceIframe.getDuration() * clickPosition;
    referenceIframe.seekTo(newTime);
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
    <button className="btn btn-next-Youtube-container"
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
    <button className="btn btn-back-Youtube-container"
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
