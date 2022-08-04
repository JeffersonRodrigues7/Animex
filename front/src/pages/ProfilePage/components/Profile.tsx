import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Figure, Form } from "react-bootstrap";
import { Buffer } from "buffer";
import { AxiosResponse } from "axios";
import { apiFindUserById, apiUpdatedProfile } from "../../../services/api";
import { AuthContext } from "../../../contexts/contextAuth";
import "./profileStyle.css";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("");
  const { id, user } = useContext(AuthContext);

  useEffect(() => {
    async function getUser(): Promise<void> {
      if (id) {
        try {
          const res_user: AxiosResponse = await apiFindUserById(id);
          const base64Flag: string = "data:image/jpg;base64,";
          const b64Image: string = Buffer.from(res_user.data.user.profile_image.data).toString();
          setProfileImage(base64Flag + b64Image);
        } catch (error: any) {
          console.error(`Error returning data from user ${user}: `, error);
        }
      }
    }

    getUser();
  }, []);

  const handlePicture = async (e: React.ChangeEvent<HTMLElement>): Promise<void> => {
    const new_image_input: HTMLInputElement = e.target as HTMLInputElement;
    const form_data: FormData = new FormData();
    if (new_image_input.files) {
      form_data.append("profileImage", new_image_input.files[0], new_image_input.files[0].name);
      form_data.append("id", id!.toString());
    }

    try {
      const res_form_data: AxiosResponse = await apiUpdatedProfile(form_data);
    } catch (error: any) {
      console.error(`Error updating profile image from user ${user}: `, error);
    }
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

export default Profile;
