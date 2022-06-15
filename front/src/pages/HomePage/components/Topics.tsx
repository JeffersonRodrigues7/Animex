import { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../../contexts/contextAuth";
import { apiListPosts } from "../../../services/api";
import TopicsTable from "./TopicsTable";
import NewTopic from "./NewTopic";
import "./topicsStyles.css";

export interface postsModel {
  id: number;
  title: string;
  text: string;
  creatorId: string;
  creatorName: string;
  lastUserPostName: string;
  replies: number;
  createdAt: string;
  updatedAt: string;
}

const Topics = () => {
  //const postsModel: { id: number; title: string; text: string; creatorId: string; creatorName: string; lastUserPostName: string; replies: number; createdAt: string; updatedAt: string }[];

  const { logout, authenticated } = useContext(AuthContext);
  const [posts, setPosts] = useState<postsModel[]>([]);
  const handleLogout = () => {
    if (logout) {
      logout();
    }
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postList = await apiListPosts();
        const postListData = postList.data;

        postListData.map((post: any) => {
          var dateNow = new Date();
          var lastUpdated = new Date(post.updatedAt);
          var duration = dateNow.valueOf() - lastUpdated.valueOf();

          const days = Math.floor(duration / (24 * 60 * 60 * 1000));
          const daysms = duration % (24 * 60 * 60 * 1000);
          const hours = Math.floor(daysms / (60 * 60 * 1000));
          const hoursms = duration % (60 * 60 * 1000);
          const minutes = Math.floor(hoursms / (60 * 1000));
          const minutesms = duration % (60 * 1000);
          const sec = Math.floor(minutesms / 1000);

          if (days > 0) {
            post.updatedAt = days + " dias atrás";
          } else if (hours > 0) {
            post.updatedAt = hours + " horas atrás";
          } else if (minutes > 0) {
            post.updatedAt = minutes + " minutos atrás";
          } else {
            post.updatedAt = sec + " segundos atrás";
          }
        });
        setPosts(postListData);
      } catch (e: any) {
        console.log("Erro ao listar posts");
      }
    }

    fetchPosts();
  }, []);

  return (
    <>
      <Container id="container_topics">
        <Row className="justify-content-md-center">
          <Col className="container_column d-none d-sm-block" xxl="2" lg="2" sm="1"></Col>
          <Col className="container_column" xxl="8" lg="8" sm="10" xs="12">
            <Row>
              <NewTopic />
            </Row>
            <TopicsTable posts={posts} />
          </Col>
          <Col className="container_column d-none d-sm-block" xxl="2" lg="2" sm="1"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Topics;
