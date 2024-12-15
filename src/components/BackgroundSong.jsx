import style from "../style/backgroundSong.module.css"
import { useRef, useEffect, useState } from "react";
import ControlerPlayer from "./ControlerPlayer"
import PlaySong from "./PlaySong"
import { useStore } from "../stateZustand/zustandState";
import { ItemResultSearchYoutube } from "./ItemResultSearchYoutube";
import SwiperSliderMusic from "./slider/SwiperSliderMusic";
import MagnifyingGlass  from '/iconSvg/magnifying-glass.svg'
import { decode } from "he";
export default function BackgroundSong() {
  const { listObjectVideoSearch } = useStore((state)=> state)

  return (
    <section className={style.backgroundSongContainer}>
      <div className={style.prueba1}>
        <InputSearchYoutube />
      </div>
      
      <div className={style.prueba2}>
     {/* <SwiperSliderMusic videoRecomendedId={'oBofuVYDoG4'}/>*/}
        <div className={style.resultVideo}>
        {listObjectVideoSearch && listObjectVideoSearch.map((e , index) => (
          <ItemResultSearchYoutube thumbnail={e.thumbnail} key={e.id || index + '#%(8'} title={e.title} idItem={e.videoId} />
        ))}
        </div>
        
        
      </div>
      <PlaySong />
      <ControlerPlayer />
    </section>
  )
}

function InputSearchYoutube() {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const {updateListObjectVideoSearch} = useStore((state)=> state)

  const inputRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        historyRef.current &&
        !historyRef.current.contains(event.target)
      ) {
        setIsHistoryVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const getInfoApiYoutube = () => {
   // const apiKey = import.meta.env.VITE_API_KEY_YOUTUBE_SEARCH;
  // Reemplaza con tu clave de API válida
  // const query = `${inputText}`;        // Palabra clave a buscar
  //const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=20`;

    fetch(`../../api/handler?query=${inputText}`)
      .then(response => response.json())
      .then(data => {
        // Procesar y mostrar los resultados
        console.log('Resultados de búsqueda:', data);
        let listFecthYoutube = []
        data.items.forEach(item => {
          const videoId = item.id.videoId;
          const title = item.snippet.title;
          const description = item.snippet.description;
          const thumbnail = item.snippet.thumbnails.medium.url;
          const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
          listFecthYoutube.push({
            videoId,
            thumbnail,
            title:decode(title),
            description,
            videoUrl
          })
          // Mostrar la información en la consola
        });
        updateListObjectVideoSearch(listFecthYoutube);
      })
      .catch(error => {
        console.error('Error al obtener datos de YouTube API:', error);
      });
  }
  return (
    <div className={style.inputSearchContainer}>
      <div className={style.inputContainer}>
        <img src={MagnifyingGlass} 
        onClick={getInfoApiYoutube}
        className={style.magnifyingGlass}
        alt="" />
      
        
        <input
          type="text"
          placeholder="Busca tu canción"
          ref={inputRef}
          value={inputText}
          onFocus={() => setIsHistoryVisible(true)} // Mostrar al enfocar
          onChange={(e) => {
            let textInput = e.target.value;
            setInputText(textInput)
          }}
          onKeyDown={(event)=>{
            if(event.key == 'Enter'){
              if(inputText.length > 1){
                getInfoApiYoutube()
              }
              
            }
          }}
        />
      </div>
      {/*isHistoryVisible && (
        <div className="history-container" ref={historyRef}>
          }
          Historial de búsquedas...
        </div>
      )*/}
    </div>
  )
}

