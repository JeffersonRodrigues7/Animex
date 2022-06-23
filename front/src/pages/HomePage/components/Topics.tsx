import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { apiListPosts } from "../../../services/api";
import { formatedData } from "../../../services/usefulFunctions";
import TopicsTable from "./TopicsTable";
import NewTopic from "./NewTopic";
import { Buffer } from "buffer";
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
  const [posts, setPosts] = useState<postsModel[]>([]);

  const handleUserImage = (image: Buffer) => {
    const base64Flag = "data:image/jpg;base64,";
    const b64Image = Buffer.from(image).toString();
    return base64Flag + b64Image;
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postList = await apiListPosts();
        const postListData = postList.data;

        postListData.map((post: any) => {
          post.user.profileImage = handleUserImage(post.user.profileImage);
          post.updatedAt = formatedData(post.updatedAt);
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
      <Container id="container_topics" className="mt-5">
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
