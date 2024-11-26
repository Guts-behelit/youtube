import { useContext, useState } from "react"
import "../style/playSong.css"

import { MusicContext } from "../context/MusicContext";
import YouTubePlayer from "./Youtube";

export default function PlaySong() {
  const { isMoved } = useContext(MusicContext)


  return (
    <div className="play-song-container"
      style={{
        transform: isMoved ? 'translateY(90%)' : 'translateY(0%)',

        transition: 'transform 1s ease',
      }}
    >

      <YouTubePlayer />
    </div>
  )
}

export function BotonShowMusicPlayer(){
  const { isMoved, setIsMoved } = useContext(MusicContext)
  return(
    <button
       onClick={()=>{
        setIsMoved(!isMoved)
      }}
      style={{transition:'transform 0.5s ease',
        transform:`rotate(${isMoved?'0deg':'180deg'})`}}
      ><i className="fa-solid fa-caret-up"></i></button>
  )
}