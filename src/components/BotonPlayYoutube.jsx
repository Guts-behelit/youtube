import { useContext } from "react"
import { MusicContext } from "../context/MusicContext"

//import "../style/controlerPlayer.css"
import '../style/botonPlay.css'

export default function BotonPlayYoutube() {
    const {isPlaying,player} = useContext(MusicContext);
    const togglePlay = (e) => {
        e.stopPropagation();
        if (player) {
          if (isPlaying) {
            player.pauseVideo();
          } else {
            player.playVideo();
          }
        }
      };

  return (
    <div>

        <button className="btn play"
        onClick={togglePlay}
        
        >
        {isPlaying ? 
        <i className="fa-solid fa-pause"></i>:
        <i className="fa-solid fa-play"></i>}
        </button>
    </div>
  )
}
