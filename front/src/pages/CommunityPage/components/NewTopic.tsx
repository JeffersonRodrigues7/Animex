import { useState, useContext, FormEvent } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import { Formik } from "formik";
import * as yup from "yup";
import EditorComponent from "../../generalComponents/Editor/EditorComponent";
import { AuthContext } from "../../../contexts/contextAuth";
import { apiCreateTopic, apiCreateComment } from "../../../services/api";
import "./newTopicStyle.css";
import { AxiosResponse } from "axios";
import { handleContent } from "../../../functions/handleNewContent";

interface ModalValuesInterface {
  new_topic_modal_title: string;
  new_topic_modal_text: string;
}

const scheme = yup.object().shape({
  new_topic_modal_title: yup.string().min(3, "O título do topic deve conter entre 3 a 30 caracteres").max(30, "O título do topic deve conter entre 3 a 30 caracteres").required("Campo obrigatório"),
});

const NewTopic = () => {
  const [content, setContent] = useState<string>("");

  const navigate: NavigateFunction = useNavigate();
  const [show, setShow] = useState(false);
  const [newTopic, setNewTopic] = useState(false);
  const [newTopicText, setNewTopicText] = useState("");
  const [variant, setVariant] = useState("success");
  const { id, user } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function createTopic(title: string, text: string, user_id: number, username: string): Promise<number> {
    try {
      const res_topic: AxiosResponse = await apiCreateTopic(title, user_id, username);
      //console.log(res_topic.data);
      if (res_topic.status === 201) {
        const final_content: string = await handleContent(content);

        //trocar content por text depois
        const res_comment: AxiosResponse = await apiCreateComment(final_content, user_id, res_topic.data.id);
        if (res_comment.status === 201) {
          navigate(`/topic/${res_topic.data.title}/${res_topic.data.id}/1`);
          return 0;
        } else {
          return 1;
        }
      } else {
        return 2;
      }
    } catch (error: any) {
      console.error(`Error creating topic or creating the comment sent in the topic from user_id ${user_id}: `, error);
      return 3;
    }
  }

  const handleSubmit = async (e: FormEvent, values: ModalValuesInterface, resetForm: Function): Promise<void> => {
    e.preventDefault();
    const title: string = values.new_topic_modal_title;
    /**
     * Esse text não está sendo usado agora com o Editor customizado,
     * mas talvez seja importante se usarmos uma area de texto normal
     */
    const text: string = values.new_topic_modal_text;
    const user_id: number = id!;
    const username: string = user!;

    const topic_result: number = await createTopic(title, text, user_id, username);

    setNewTopic(true);
    setVariant("success");
    if (topic_result === 0) {
      resetForm();
      setNewTopicText("Topic cadastrado com sucesso");
    } else if (topic_result === 1) {
      resetForm();
      setVariant("warning");
      setNewTopicText("Topic cadastrado com sucesso, mas houve um erro ao criar o comentário");
    } else if (topic_result === 2) {
      setVariant("danger");
      setNewTopicText("Não foi possível criar novo tópico");
    } else {
      setVariant("danger");
      setNewTopicText("Erro na criação do tópico ou comentário do tópico");
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
          <Alert show={newTopic} variant={variant} id="topic_alert">
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
