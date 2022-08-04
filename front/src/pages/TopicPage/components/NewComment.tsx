import { useState, useContext, FormEvent } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/contextAuth";
import { Formik } from "formik";
import { socket } from "../../../services/apiSocket";
import EditorComponent from "../../generalComponents/Editor/EditorComponent";
import { apiCreateComment, apiUpdatedTopic } from "../../../services/api";
import { handleContent } from "../../../functions/handleNewContent";
import "./newCommentStyle.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props {
  topic_id: number;
  user_id: number;
  hide_text_area: boolean;
  setHideTextArea: Function;
  new_comment_content: string;
  setNewCommentContent: Function;
}

const NewComment = ({ topic_id, user_id, hide_text_area, setHideTextArea, new_comment_content, setNewCommentContent }: Props) => {
  const { user } = useContext(AuthContext);

  const [newComment, setNewComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [variant, setVariant] = useState("success");

  const handleAlert = (result: number): void => {
    setNewComment(true);
    if (result === 0) {
      setVariant("success");
      setNewCommentText("Comentário criado com sucesso");
    } else if (result === 1) {
      setVariant("danger");
      setNewCommentText("Erro ao cadastrar comentário");
    } else {
      setVariant("danger");
      setNewCommentText("Erro ao acessar banco de dados");
    }

    setTimeout(function () {
      setNewComment(false);
    }, 3000);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    var result: number = 0;

    const final_content: string = await handleContent(new_comment_content);

    try {
      const comment_result = await apiCreateComment(final_content, user_id, topic_id);
      if (comment_result.status === 201) {
        socket.emit("new_message", comment_result.data);
        //console.log("Mensagem criada: ", comment_result.data);
        await apiUpdatedTopic(topic_id, user!);
      } else {
        result = 1;
      }
    } catch (error: any) {
      console.error(`Error creating comment or updating topic with id ${topic_id}: `, error);
      result = 2;
    }

    handleAlert(result);
  };

  return (
    <>
      <div id="aux_div_new_comment" className={hide_text_area ? "aux_div_new_comment_input_style" : "aux_div_new_comment_style"}></div>
      <div id="new_comment_input" hidden={!hide_text_area} className="fixed-bottom" onClick={() => setHideTextArea(false)}>
        <Form.Group controlId="new_comment_input">
          <Form.Control placeholder="Clique aqui para responder" />
        </Form.Group>
      </div>
      <div hidden={hide_text_area} id="new_comment_div" className="fixed-bottom">
        <Formik id="formik" onSubmit={console.log} initialValues={{}}>
          {({ resetForm }) => (
            <Form id="new_comment_form" onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" style={{ background: "white" }} controlId="new_comment_text">
                <EditorComponent setContent={setNewCommentContent} />
              </Form.Group>
              <hr></hr>
              <Button id="new_comment_close" variant="dark" onClick={() => setHideTextArea(true)}>
                Fechar
              </Button>
              <Button id="new_comment_button" variant="primary" type="submit">
                Enviar
              </Button>
              <div id="alert_div">
                <Alert show={newComment} variant={variant} id="comment_alert">
                  <p>{newCommentText}</p>
                </Alert>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default NewComment;
