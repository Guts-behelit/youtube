import WavesurferPlayer from '@wavesurfer/react'
import { useContext, useEffect, useState } from 'react'

import { MusicContext } from '../context/MusicContext'
export default function SomeThing({color}) {
  const {audio,updateWavesurfer} = useContext(MusicContext)
    const [wavesurfer, setWavesurfer] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const onReady = (ws) => {
      /**
       * por medio del setwavesurfer 
       * le enviamoss y tomamos la info
       * del reproductor
       */
      setWavesurfer(ws)
      setIsPlaying(false)
    }
  
    const onPlayPause = () => {
      wavesurfer && wavesurfer.playPause()
      console.log(wavesurfer)
    }
   
  return (
    <>
    <WavesurferPlayer
    width={200}
      height={100}
      waveColor={color}
      onReady={onReady}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      media={audio}
    />

    <button onClick={(e)=>{
      
      onPlayPause()
     
    }}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  </>
  )
}
