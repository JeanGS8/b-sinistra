import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from 'react';
import { getVideos } from '../../services/service';
import { CardVideo } from "../cardVideo/index";
import {RiArrowDropLeftLine, RiArrowDropRightLine} from "react-icons/ri";

export const CardCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');

  const fetchList = async () => {
    try{
      const data = await getVideos(nextPageToken);
      const filteredVideos = data.items.filter(item => !videos.find(video => video.id === item.id));

      setNextPageToken(data.nextPageToken || '');
      
      setVideos(prevVideos => [
        ...prevVideos,
        ...filteredVideos
      ]);
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
      items: 5
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
    <RiArrowDropLeftLine
      onClick={
        () => {
          console.log("esquerda");
          console.log(videos);
          setVideos(prevVideos => prevVideos.slice(0, -5));
          onClick();
        }
      }
      style={{position: "absolute", left: 0, top: "50%", zIndex: 100, color: "white"}}
      size={50}
      />
      );
      
      const CustomRightArrow = ({ onClick }) => (
        <RiArrowDropRightLine
        onClick={
          async () => {
            console.log("direita");
            console.log(videos);
          await fetchList();
          onClick();
        }
      }
      style={{position: "absolute", right: 0, top: "50%", zIndex: 100, color: "white"}}
      size={50}
    />
  );

  return (      
      <Carousel
        customLeftArrow={<CustomLeftArrow />}
        
        customRightArrow={<CustomRightArrow />}

        slidesToSlide={5}
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all 1s"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        arrows
      >
        {videos.map(video => (
          <CardVideo src={video.snippet.thumbnails.medium.url} text={video.snippet.title} link={video.snippet.resourceId.videoId} key={video.id}/>
        ))}
      </Carousel>
  );
}