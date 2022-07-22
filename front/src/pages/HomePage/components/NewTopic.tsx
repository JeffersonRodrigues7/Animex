import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { Formik } from "formik";
import * as yup from "yup";
import EditorComponent from "../../generalComponents/Editor/EditorComponent";
import { AuthContext } from "../../../contexts/contextAuth";
import { apiCreatePost, apiCreateComment } from "../../../services/api";
import "./newTopicStyles.css";

const scheme = yup.object().shape({
  new_topic_modal_title: yup.string().min(3, "O título do post deve conter entre 3 a 30 caracteres").max(30, "O título do post deve conter entre 3 a 30 caracteres").required("Campo obrigatório"),
});

const NewTopic = () => {
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [newTopic, setNewTopic] = useState(false);
  const [newTopicText, setNewTopicText] = useState("");
  const [variant, setVariant] = useState("success");
  const { id, user } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function createPost(title: string, text: string, userId: number, userName: string): Promise<Number> {
    try {
      const resPost = await apiCreatePost(title, text, userId, userName);
      //console.log(resPost.data);
      if (resPost.status === 201) {
        const resComment = await apiCreateComment(content, resPost.data.id, userId);
        if (resComment.status === 201) {
          navigate(`/topic/${resPost.data.title}/${resPost.data.id}/1`);
          return 0;
        } else {
          return 1;
        }
      } else {
        return 2;
      }
    } catch (error) {
      console.log(error);
      return 3;
    }
  }

  const handleSubmit = async (e: any, values: any, resetForm: any) => {
    e.preventDefault();
    const title: string = values.new_topic_modal_title;
    const text: string = values.new_topic_modal_text;
    const userId: number = id!;
    const userName: string = user!;

    const postResult = await createPost(title, text, userId, userName);

    setNewTopic(true);
    setVariant("success");
    if (postResult === 0) {
      resetForm();
      setNewTopicText("Post cadastrado com sucesso");
    } else if (postResult === 1) {
      resetForm();
      setVariant("warning");
      setNewTopicText("Post cadastrado com sucesso, mas houve um erro ao criar o comentário");
    } else if (postResult === 2) {
      setVariant("danger");
      setNewTopicText("Não foi possível criar novo tópico");
    } else {
      setVariant("danger");
      setNewTopicText("Erro ao cadastrar novo tópico");
    }

    setShow(false);
    setTimeout(function () {
      setNewTopic(false);
    }, 3000);
  };

  return (
    <>
      <div>
        <Button id="new_topic_button" className="px-0 py-0 shadow-none" variant="link" onClick={handleShow}>
          <BsPlusCircleFill size={40} id="new_topic_icon" />
        </Button>
        <div id="alert_div" className="px-2" style={{ display: "inline" }}>
          <Alert show={newTopic} variant={variant} id="post_alert">
            <p>{newTopicText}</p>
          </Alert>
        </div>
      </div>

      <Modal id="new_topic_modal" size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Tópico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            id="formik"
            validationSchema={scheme}
            onSubmit={console.log}
            initialValues={{
              new_topic_modal_title: "",
              new_topic_modal_text: "",
            }}
          >
            {({ handleChange, values, errors, isValid, dirty, resetForm }) => (
              <Form onSubmit={(e) => handleSubmit(e, values, resetForm)}>
                <Form.Group className="mb-3" controlId="new_topic_modal_title">
                  <Form.Label>Título</Form.Label>
                  <Form.Control autoFocus type="title" required name="new_topic_modal_title" onChange={handleChange} value={values.new_topic_modal_title} isInvalid={!!errors.new_topic_modal_title} />
                  <Form.Control.Feedback type="invalid">{errors.new_topic_modal_title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="new_topic_modal_text">
                  <EditorComponent setContent={setContent} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
                  Registrar
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewTopic;
