import { CardCarousel } from "../../components/cardCarousel";
import { Helmet } from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import "./home.css";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Broxada Sinistra</title>
      </Helmet>

      <Container fluid className="background-image-container">
        <Row className="left-bottom">
          <Col>
            <h1> <img src="/logo.jpg" alt="Logo broxada sinistra" className="logo" /> </h1>
          </Col>
        </Row>
        <Row className="my-5">
          <Col sm={12}>
            <CardCarousel />
          </Col>
        </Row>
      </Container>
    </>
  )
}