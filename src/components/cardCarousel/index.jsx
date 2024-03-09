import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from 'react';
import { getVideos } from '../../services/service';
import { CardVideo } from "../cardVideo/index";
import {RiArrowDropLeftLine, RiArrowDropRightLine} from "react-icons/ri";
import "./cardCarousel.css";

export const CardCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [resLargura, setResLargura] = useState(null);

  const fetchList = async () => {
    try{
      let maxResultados = 0;
      let resultadoAtual = 0;
      let nextPageToken = "";

      do{
        const data = await getVideos(nextPageToken);
        maxResultados = await data.pageInfo.totalResults;
        resultadoAtual += 50;
        
        nextPageToken = data.nextPageToken;
        
        setVideos(prevVideos => [
          ...prevVideos,
          ...data.items
        ]);
        
      } while(resultadoAtual < maxResultados);
    }
    catch(error) {
      console.error(`Ocorreu um erro: ${error}`);
      throw error;
    };
  }

  useEffect(() => {
    fetchList();
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const CustomLeftArrow = ({ onClick }) => (
    <RiArrowDropLeftLine onClick={onClick} className="arrow left-arrow" />
  );
      
  const CustomRightArrow = ({ onClick }) => (
    <RiArrowDropRightLine onClick={onClick} className="arrow right-arrow" />
  );

  useEffect(() => {
    const handleResize = () => {
      setResLargura(window.innerWidth < 1024 ? "mobile" : null);
    };
  
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <Carousel
        customLeftArrow={<CustomLeftArrow />}
        
        customRightArrow={<CustomRightArrow />}
        
        slidesToSlide={
          resLargura == "mobile"? 1 : 4
        }
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={
          resLargura == "mobile"? true: false
        }
        autoPlaySpeed={1500}
        keyBoardControl={true}
        customTransition="transform 1500ms ease-in-out"
        transitionDuration={1500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {videos.map(video => (
          <CardVideo src={video.snippet.thumbnails.medium.url} text={video.snippet.title} link={video.snippet.resourceId.videoId} key={video.id}/>
        ))}
      </Carousel>
  );
}