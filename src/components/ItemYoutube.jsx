import { useStore } from "../stateZustand/zustandState"
import style from '../style/itemYoutube.module.css'
export function ItemYoutube({ videoItem }) {
    const { updateIdActualVideoIframe,updateObjectVideoActually } = useStore((state) => state)
    const { videoId, thumbnails:[,{url:mediumThumbnail}], title, lengthSeconds } = videoItem.video
  
    const handleMusic = () => {
      updateIdActualVideoIframe(videoId)
      //updateObjectVideoActually(videoItem)
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
        <span className={style.timeVideo}>{formatTime(lengthSeconds)}</span>
        <div className={style.titleContainer} >
       
            <h3 className={style.descriptionTitle}>{title}</h3>

        </div>
  
      </div>
    )
  }