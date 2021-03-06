import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Figure, Form } from "react-bootstrap";
import { apiFindUserById, apiUpdatedProfile } from "../../../services/api";
import { AuthContext } from "../../../contexts/contextAuth";
import { Buffer } from "buffer";
import "./profileStyles.css";

export const Profile = () => {
  const [profileImage, setProfileImage] = useState("");
  const { id } = useContext(AuthContext);

  useEffect(() => {
    async function getUser() {
      if (id) {
        try {
          const res = await apiFindUserById(id);
          const base64Flag = "data:image/jpg;base64,";
          const b64Image = Buffer.from(res.data.user.profileImage.data).toString();
          setProfileImage(base64Flag + b64Image);
        } catch (error) {
          console.log("Dados de usuário não encontrado", error);
        }
      }
    }

    getUser();
  }, []);

  const handlePicture = async (e: any) => {
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append("profileImage", e.target.files[0], e.target.files[0].name);
    formData.append("userId", id!.toString());

    apiUpdatedProfile(formData);
  };

  return (
    <Container id="container_topics" className="mt-5">
      <Row className="justify-content-md-center">
        <Col className="container_column d-none d-sm-block" xxl="2" lg="2" sm="1"></Col>
        <Col className="container_column" xxl="8" lg="8" sm="10" xs="12">
          <Row>
            <Form.Control type="file" size="sm" onChange={(e) => handlePicture(e)} />
            <Figure>
              <Figure.Image id="profile_image" alt="profile_image" src={profileImage} />
            </Figure>

            <Form.Group className="mb-3 mt-3" controlId="biography_textArea">
              <Form.Label>Biografia</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
          </Row>
        </Col>
        <Col className="container_column d-none d-sm-block" xxl="2" lg="2" sm="1"></Col>
      </Row>
    </Container>
  );
};
