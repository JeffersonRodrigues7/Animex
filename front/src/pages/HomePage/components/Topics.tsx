import { Container, Row, Col } from "react-bootstrap";
import TopicsTable from "./TopicsTable";
import NewTopic from "./NewTopic";
import "./topicsStyles.css";

const Topics = () => {
  return (
    <>
      <Container id="container_topics" className="mt-5">
        <div className="video-responsive">
          <iframe
            width="200"
            height="115"
            src="https://www.youtube-nocookie.com/embed/kS2mXX_sOEc"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        <Row className="justify-content-md-center">
          <Col className="container_column d-none d-sm-block" xxl="2" lg="2" sm="1"></Col>
          <Col className="container_column" xxl="8" lg="8" sm="10" xs="12">
            <Row>
              <NewTopic />
            </Row>
            <TopicsTable />
          </Col>
          <Col className="container_column d-none d-sm-block" xxl="2" lg="2" sm="1"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Topics;
