import { useRef, useEffect, useContext, useState } from "react"
import { MusicContext } from "../context/MusicContext";
import { useWavesurfer } from "@wavesurfer/react";


const formatTime = (seconds) => {
  return [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(':');
}




export default function BarProgressSong() {

  const containerRef = useRef(null);
  const { audio, urlSongs, updateWavesurfer, indexSong, setIndexMusic } = useContext(MusicContext);
  
  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    //url: urlSongs[indexSong],
    waveColor: 'black',
    height: 50,
    progressColor: 'orange',
    cursorColor: "#ff7000",
    cursorWidth: 4,     // Set a bar width
    barWidth: 5,
    // Optionally, specify the spacing between bars
    barGap: 2,
    // And the bar radius
    barRadius: 5,
    media: audio
  })


  useEffect(() => {
    let url = "https://v3.api-youtube.com/youtube/search"
    let apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOTQiLCJhdWQiOlsiZmFzdGFwaS11c2VyczphdXRoIl0sImV4cCI6MTc2MzE1ODQzMn0.cE2Rvh9-zG5VxDKKmMF7Qb1OQhEL1x03N5tyW7YWVyI"
    fetch()
    
  }, [])
  return (
    <>
      <div className="rectangule-1"
        ref={containerRef}
      >
        <span>Current time: {formatTime(currentTime)}</span>
        <button onClick={() => {
          if (indexSong < 2) {
            setIndexMusic((i) => i + 1)
          }
        }}>next</button>
        <button onClick={
          () => {
            console.log(wavesurfer)
            wavesurfer && wavesurfer.playPause()
          }
        }>
          play
        </button>
      
      </div>

    </>
  )
}
