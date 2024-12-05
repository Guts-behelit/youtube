import { useStore } from "../stateZustand/zustandState"
import style from '../style/itemYoutube.module.css'
export function ItemYoutube({ videoItem }) {
    const { updateIdActualVideoIframe,updateObjectVideoActually } = useStore((state) => state)
    const { videoId, thumbnail: [,{ url: mediumThumbnail }], title, lengthText: timeVideo } = videoItem
  
    const handleMusic = () => {
      updateIdActualVideoIframe(videoId)
      updateObjectVideoActually(videoItem)
  }
  
    return (
      <div className={style.listItemContainer}
        onClick={handleMusic} >
        <img className={style.imageItem} src={mediumThumbnail} />
        <div className={style.titleContainer} >
          <h3>{title}</h3>
        </div>
  
      </div>
    )
  }