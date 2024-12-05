import { useRef ,useEffect} from "react";
import { useStore } from "./zustandState";
import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { ListItemYoutube } from "../components/Youtube";

export const CopyIframe = () => {
    const playerRef = useRef(null);
    const {idActualVideoIframe ,
        referenceIframe,
        isReproduction,
        updateReferenceIframe,
        updateIsReproduction
    }= useStore((state)=> state);

    const { setProgress} = useContext(MusicContext);
    

  
    useEffect(() => {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // cuando termina de cargarse el script del iframe 
      window.onYouTubeIframeAPIReady = () => {
        const newPlayer = new window.YT.Player(playerRef.current, {
          videoId: idActualVideoIframe, // Primer video
          playerVars: { autoplay: 0, controls: 0 }, // Sin controles nativos
          events: {
            onReady: (event) => updateReferenceIframe(event.target),/**
             *Cuando el reproductor está listo, se obtiene 
             la referencia del reproductor (event.target)
              y se guarda usando setPlayer 
             */
            onStateChange: (event) => handleStateChange(event), /**
            Ejecuta el código cuando cambia el estado del reproductor
             (por ejemplo, cuando empieza, pausa o termina el video)
            */
          },
        });
      };
      console.log("primer useEffect")
    }, []);//opcional ??
  
    // Efecto para cambiar de video cuando indexSong cambia
    useEffect(() => {
      if (referenceIframe) {
        referenceIframe.loadVideoById(idActualVideoIframe); // Cambia el video sin recrear el reproductor
        updateIsReproduction(false); // Pausa el video al cambiar
      }
      console.log("segundo effect")
    }, [idActualVideoIframe]);
  
    //
    useEffect(() => {
      let interval;
  
      if (isReproduction && referenceIframe) {// todo este codigo se encarga de actualizar 
        //un estado , para que la barra de progreso 
        //obtenga ese valor y lo use para actualizar la barra de player
        interval = setInterval(() => {
          if (referenceIframe && referenceIframe.getDuration) {
            const currentTime = referenceIframe.getCurrentTime();
            const duration = referenceIframe.getDuration();
            const progressPercentage = (currentTime / duration) * 100;
            setProgress(progressPercentage);
          }
        }, 500);
      }
  
      return () => clearInterval(interval);
    }, [isReproduction, referenceIframe]);
  
    // funcion que comprueba si el iframe esta en play o pause 
    // y segun eso cambia el estado de isPlaying
    const handleStateChange = (event) => {
      if (event.data === window.YT.PlayerState.PLAYING) {
        updateIsReproduction(true);
      } else {
        updateIsReproduction(false);
      }
    };
  
  
  
    return (
      <div className='youtube-player-iframe-container'>
        {/* Aqui va el iframe de youtube */}
        <div className='iframe-container'>
          <div id="youtube-iframe" ref={playerRef} ></div>
        </div>
  
  
        <ListItemYoutube/>
    {/*aqui va el componente listItem*/}
      </div>
    );
  };
  