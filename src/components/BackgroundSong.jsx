import "../style/backgroundSong.css"
import { useRef, useEffect, useState } from "react";
import ControlerPlayer from "./ControlerPlayer"
import PlaySong from "./PlaySong"
import { useStore } from "../stateZustand/zustandState";

export default function BackgroundSong() {
  const { listObjectVideoSearch } = useStore((state)=> state)

  return (
    <section className="background-song-container">
      <div className="prueba1">
      <i className="fa-solid fa-biohazard"></i>
        <InputSearchYoutube />
      </div>
      <div className="prueba2">
        {listObjectVideoSearch && listObjectVideoSearch.map((e , index) => (
          <ItemResultSearchYoutube thumbnail={e.thumbnail} key={e.id || index + '#%(8'} title={e.title} idItem={e.videoId} />
        ))}
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
    const apiKey = 'AIzaSyBmcw5S5OlPzyBe-CaQfAgrt0dHYpSTNyE'
    // Reemplaza con tu clave de API válida
    const query = `${inputText}`;        // Palabra clave a buscar
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=20`;

    fetch(apiUrl)
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
            title,
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
    <div className="input-search-container">
      <div className="input-container">
        <i className="fa-solid fa-magnifying-glass"
          onClick={getInfoApiYoutube}
        ></i>
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
      {isHistoryVisible && (
        <div className="history-container" ref={historyRef}>
          {/* Aquí va el historial de búsquedas */}
          Historial de búsquedas...
        </div>
      )}
    </div>
  )
}

 function ItemResultSearchYoutube({ thumbnail, title, idItem  }) {
 
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
    <div className={'item-result-search-container'}
      onClick={handleMusic}
    >
      <img src={thumbnail} alt={`imagen de ${thumbnail}`} />
      <h3>{title}</h3>

    </div>
  )
}