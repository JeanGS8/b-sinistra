import {Card} from "react-bootstrap";
import "./cardVideo.css";

export const CardVideo = ({src, text, link}) => {
  
  return (
    <Card className="card">
      <a
        href={`https://www.youtube.com/watch?v=${link}`}
        target="_blank"
      >
        <Card.Body className="p-0"> 
          <Card.Img src={src} className="foto"/>
            <Card.Title
              className="card-title text-center"
            >
              {text}
            </Card.Title>
        </Card.Body>
      </a>
    </Card>
  );
}