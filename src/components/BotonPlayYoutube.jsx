//import { useContext } from "react"
//import { MusicContext } from "../context/MusicContext"

//import "../style/controlerPlayer.css"
import '../style/botonPlay.css'
import { useStore } from "../stateZustand/zustandState";

export default function BotonPlayYoutube() {
    const {isReproduction,referenceIframe} = useStore((state)=> state)
    const togglePlay = (e) => {
        e.stopPropagation();
        if (referenceIframe) {
          if (isReproduction) {
            referenceIframe.pauseVideo();
          } else {
            referenceIframe.playVideo();
          }
        }
      };

  return (
    <div>

        <button className="btn play"
        onClick={togglePlay}
        
        >
        {isReproduction ? 
        <i className="fa-solid fa-pause"></i>:
        <i className="fa-solid fa-play"></i>}
        </button>
    </div>
  )
}
