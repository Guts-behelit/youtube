import { useStore } from "../stateZustand/zustandState"
import style from '../style/itemYoutube.module.css'
import { decode } from "he"

export function ItemYoutube({ videoItem }) {
    const { updateIdActualVideoIframe,updateObjectVideoActually } = useStore((state) => state)
    const { videoId, thumbnail:[,{url:mediumThumbnail}], title } = videoItem
  
    const handleMusic = () => {
      updateIdActualVideoIframe(videoId);

      let songReproducer = {videoId,
        thumbnail:[{url:mediumThumbnail},{url:""}],
        title:decode(title),
        lengthText:''}

      updateObjectVideoActually(songReproducer)
  }
  const  formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Calcula las horas
    const minutes = Math.floor((seconds % 3600) / 60); // Calcula los minutos restantes
    const remainingSeconds = seconds % 60; // Calcula los segundos restantes
  
    // Asegura que los minutos y segundos siempre tengan dos dígitos
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  
    // Si hay horas, muestra hh:mm:ss, de lo contrario solo mm:ss
    if (hours > 0) {
      return `${hours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
      return `${minutes}:${formattedSeconds}`;
    }
  }
    return (
      <div className={style.listItemContainer}
        onClick={handleMusic} >
        <img className={style.imageItem} src={mediumThumbnail} />
        <span className={style.timeVideo}>{'formatTime(lengthSeconds)'}</span>
        <div className={style.titleContainer} >
       
            <h3 className={style.descriptionTitle}>{title}</h3>

        </div>
  
      </div>
    )
  }