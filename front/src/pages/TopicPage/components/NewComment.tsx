import { useState, useContext } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/contextAuth";
import { Formik } from "formik";
import { socket } from "../../../services/apiSocket";
import EditorComponent from "../../generalComponents/Editor/EditorComponent";
import { apiCreateComment, apiUpdatedPost } from "../../../services/api";
import { handleContent } from "../../../services/usefulFunctions";
import "./newCommentStyles.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props {
  postId: number;
  userId: number;
  fetchList: Function;
}

const NewComment = ({ postId, userId, fetchList }: Props) => {
  const { user } = useContext(AuthContext);

  const [content, setContent] = useState<string>("");
  const [newComment, setNewComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [variant, setVariant] = useState("success");

  const [hideTextArea, setHideTextArea] = useState(true);

  const handleAlert = (result: number) => {
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

  const handleSubmit = async (e: any, resetForm: any) => {
    e.preventDefault();
    var result: number = 0;

    var finalContent = handleContent(content);

    try {
      const commentResult = await apiCreateComment(finalContent, postId, userId);
      if (commentResult.status === 201) {
        socket.emit("new_message", commentResult.data);
        //console.log("Mensagem criada: ", commentResult.data);
        await apiUpdatedPost(postId, user!);
      } else {
        result = 1;
      }
    } catch (error) {
      console.log("Erro ao criar comentário - ", error);
      result = 2;
    }

    handleAlert(result);
  };

  return (
    <>
      <div id="aux_div_new_comment" className={hideTextArea ? "aux_div_new_comment_input_style" : "aux_div_new_comment_style"}></div>
      <div id="new_comment_input" hidden={!hideTextArea} className="fixed-bottom" onClick={() => setHideTextArea(false)}>
        <Form.Group controlId="new_comment_input">
          <Form.Control placeholder="Clique aqui para responder" />
        </Form.Group>
      </div>
      <div hidden={hideTextArea} id="new_comment_div" className="fixed-bottom">
        <Formik id="formik" onSubmit={console.log} initialValues={{}}>
          {({ resetForm }) => (
            <Form id="new_comment_form" onSubmit={(e) => handleSubmit(e, resetForm)}>
              <Form.Group className="mb-3" style={{ background: "white" }} controlId="new_comment_text">
                <EditorComponent setContent={setContent} />
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
