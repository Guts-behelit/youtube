import { useStore } from "../stateZustand/zustandState"
import style from '../style/itemYoutube.module.css'
export function ItemYoutube({ videoItem }) {
    const { updateIdActualVideoIframe,updateObjectVideoActually } = useStore((state) => state)
    const { videoId, thumbnail: [,{ url: mediumThumbnail }],channelThumbnail:[{url : urlChannel}],channelTitle, title, lengthText: timeVideo } = videoItem
  
    const handleMusic = () => {
      updateIdActualVideoIframe(videoId)
      updateObjectVideoActually(videoItem)
  }
  
    return (
      <div className={style.listItemContainer}
        onClick={handleMusic} >
        <img className={style.imageItem} src={mediumThumbnail} />
        <span className={style.timeVideo}>{timeVideo}</span>
        <div className={style.titleContainer} >
        <figure className={style.imageChannelContainer}>
              <img src={urlChannel} alt="" />
            </figure>
          <div className={style.description}>
            <h3 className={style.descriptionTitle}>{title}</h3>
          <span>{channelTitle}</span>
          </div>
        </div>
  
      </div>
    )
  }