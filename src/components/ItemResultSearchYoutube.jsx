import { useStore } from "../stateZustand/zustandState";
import style from '../style/itemResultSearchYoutube.module.css'

export function ItemResultSearchYoutube({ thumbnail, title, idItem  }) {
 
    const {updateIdActualVideoIframe,updateObjectVideoActually} = useStore((state)=> state)
    
    const handleMusic = () => {
      const ObjectActually = {videoId:idItem,
        thumbnail:[{url:thumbnail},{url:""}],
        title:title,
        lengthText:'5.56'}
  
      updateIdActualVideoIframe(idItem);
      updateObjectVideoActually(ObjectActually);
     
  
    }
  
    return (
      <div className={style.itemNewContainer}
        onClick={handleMusic}>
        <img className={style.itemImage} src={thumbnail} alt={`imagen de ${thumbnail}`} />
        <h3 className={style.description}>{title}</h3>
        <div className={style.filtro}></div>
      </div>
    )
  }