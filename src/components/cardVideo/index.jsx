import {Card} from "react-bootstrap";
import "./cardVideo.css";

export const CardVideo = ({src, text, link}) => {
  
  return (
    <Card className="mx-2">
      <div style={{position: "relative"}}>
          <a
            href={`https://www.youtube.com/watch?v=${link}`}
            target="_blank"
          >
            <Card.Body className="p-0"> 
              <Card.Img src={src}/>
              <div
                className=" card-hover text-center"
              >
                <Card.Title
                  style={{color: "white"}}
                >
                  {text}
                </Card.Title>
              </div>
            </Card.Body>
          </a>
      </div>
    </Card>
  );
}