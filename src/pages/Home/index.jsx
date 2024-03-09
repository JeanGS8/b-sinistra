import { Helmet } from "react-helmet";
import {Container, Row, Col} from "react-bootstrap";
import "./home.css";
import { CardCarousel } from "../../components/cardCarousel/index";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Broxada Sinistra</title>
      </Helmet>

      <Container fluid className="background-image-container">
        <Row className="left-bottom">
          <Col sm={1}></Col>
          <Col>
            <h1> <img src="/logo.png" alt="Logo broxada sinistra" className="logo" /> </h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <CardCarousel />
          </Col>
        </Row>
      </Container>
    </>
  )
}