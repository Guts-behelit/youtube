
import { createContext, useState } from "react"
import { useWavesurfer } from "@wavesurfer/react";

let urlsMusic = [
    "eiHqkDoFFFU",
    "dQ4XHW5Q4gU",
    "TvZskcqdYcE"

]
export let MusicContext = createContext(null);

export default function MusicContextProvider({ children }) {
    const [indexSong, setIndexSong] = useState(0);
    const [play, setPlay] = useState("play");
    const [wavesurferMedia, setWavesurferMedia] = useState("");
    const [urlSongs, setUrlSongs] = useState(urlsMusic)
    const [currentTime, setCurrentTime] = useState('');
    const [isMoved, setIsMoved] = useState(false);
    const [player, setPlayer] = useState(null); // Estado para el reproductor
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(50);
    const [resultSearchYoutube,setResultSearchYoutube] = useState([]);
    const [musicActually,setMusicActually] = useState({});
    const audio = new Audio();
    audio.src = urlSongs[indexSong];
    
    const updatePlay = (value) => {
        setPlay(value);
    }
    const updateWavesurfer = (wave) => {
        setWavesurferMedia(wave);

    }
    return (
        <MusicContext.Provider value={{
            volume,
            progress,
            isMoved,
            indexSong,
            currentTime,
            
            setIsMoved,
           
            
            setProgress,
            setVolume,
            
            
           
        }}>
            {children}
        </MusicContext.Provider>
    )
}
