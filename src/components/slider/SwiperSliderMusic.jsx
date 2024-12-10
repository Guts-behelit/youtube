import { useState ,useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Importa Swiper y SwiperSlide
import "swiper/css"; // Importa estilos base de Swiper
import "swiper/css/effect-coverflow"; // Importa estilos específicos del efecto Coverflow
import "swiper/css/pagination"; // Estilos de la paginación
import { EffectCoverflow, Pagination } from "swiper/modules"; // Importa módulos necesarios
import { useStore } from "../../stateZustand/zustandState";
import style from '../../style/sliderSwiper/swiperSliderMusic.module.css'
import styleItem from '../../style/sliderSwiper/itemSwiperSlider.module.css'

const SwiperSliderMusic = ({videoRecomendedId = undefined}) => {
    const { idActualVideoIframe ,objectVideoActually} = useStore((state) => state);
    const [musicRecomended,setMusicRecomended] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const url = `https://yt-api.p.rapidapi.com/related?id=${videoRecomendedId == undefined ? idActualVideoIframe: videoRecomendedId}`;
            const options = {
              method: 'GET',
              headers: {
                'x-rapidapi-key': 'bc298b1a47msh719b80ee47579e4p13c84ajsn89664b62ad7c',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
              }
            };
      
            try {
              const response = await fetch(url, options);
              const result = await response.json();
              console.log(result);
              setMusicRecomended(result.data)
            } catch (error) {
              console.error(error);
            }
          };
      
          fetchData();
      }, [videoRecomendedId,idActualVideoIframe]);
    

  return (
    <div className={style.swiperContainer}>
      
      <Swiper
        effect="coverflow" // Activa el efecto Coverflow
        grabCursor={true} // Habilita el cursor de arrastre
        centeredSlides={true} // Centraliza los slides
        slidesPerView="auto" // Muestra automáticamente el tamaño de los slides
        loop={true}
        coverflowEffect={{
          rotate: 15, // Ángulo de rotación
          stretch: 10, // Espaciado entre slides
          depth: 150, // Profundidad 3D
          modifier: 2.5, // Intensidad del efecto
          slideShadows: false, // Sombras en los slides
        }}
        pagination={{ clickable: true }} // Habilita la paginación
        modules={[EffectCoverflow]} // Añade los módulos
        className={style.swiperPrincipal}
      >
        {musicRecomended &&
        musicRecomended.filter((videoRecomended) => (videoRecomended.type == 'video')).map((videoRecomended) => (
          <SwiperSlide className={style.swiperSlide} key={videoRecomended.videoId + '$%&#'}>
            <ItemSwiperSlider
            videoItem={videoRecomended} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSliderMusic;

function ItemSwiperSlider({ videoItem  }) {
 
    const { updateIdActualVideoIframe,updateObjectVideoActually } = useStore((state) => state)
    const { videoId, thumbnail: [,{ url: mediumThumbnail }], title, lengthText: timeVideo } = videoItem
  
    const handleMusic = () => {
      updateIdActualVideoIframe(videoId)
      updateObjectVideoActually(videoItem)
  }
  
    return (
      <div className={styleItem.itemSwiperSlideContainer}
        onClick={handleMusic}>
        <img className={styleItem.itemSwiperImage} src={mediumThumbnail} alt={`imagen de ${mediumThumbnail}`} />
        <h3 className={styleItem.itemSwiperDescription}>{title}</h3>
        <div className={styleItem.itemFiltroSwiper}></div>
      </div>
    )
  }