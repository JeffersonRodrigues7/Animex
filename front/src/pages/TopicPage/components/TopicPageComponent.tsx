import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Comment from "./Comment";
import "./topicPageStyles.css";

const TopicPageComponent = () => {
  return (
    <Container id="container_comments" className="mt-5">
      <Row className="justify-content-md-center">
        <Col className="container_column d-none d-sm-block" xxl="3" lg="2" sm="1"></Col>
        <Col className="container_column" xxl="6" lg="8" sm="10" xs="12">
          <Row>
            <Comment></Comment>
          </Row>
        </Col>
        <Col className="container_column d-none d-sm-block" xxl="3" lg="2" sm="1"></Col>
      </Row>
    </Container>
  );
};

export default TopicPageComponent;
