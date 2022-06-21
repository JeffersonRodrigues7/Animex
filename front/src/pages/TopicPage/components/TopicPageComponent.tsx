import { Container, Row, Col } from "react-bootstrap";
import Comment from "./Comment";
import "./topicPageStyles.css";

const TopicPageComponent = () => {
  return (
    <Container id="container_comments" className="mt-5">
      <Row className="justify-content-md-center">
        <Col className="container_column d-none d-sm-block" xxl="2" lg="2" sm="1"></Col>
        <Col className="container_column" xxl="8" lg="8" sm="10" xs="12">
          <Row>
            <Comment></Comment>
            <hr></hr>
            <Comment></Comment>
          </Row>
        </Col>
        <Col className="container_column d-none d-sm-block" xxl="2" lg="2" sm="1"></Col>
      </Row>
    </Container>
  );
};

export default TopicPageComponent;
