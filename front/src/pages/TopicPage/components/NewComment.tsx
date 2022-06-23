import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Formik } from "formik";
import EditorComponent from "../../generalComponents/Editor/EditorComponent";
import { apiCreateComment } from "../../../services/api";
import "./newCommentStyles.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props {
  postId: number;
  userId: number;
}

const NewComment = ({ postId, userId }: Props) => {
  const [content, setContent] = useState<string>("");

  const [newComment, setNewComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [variant, setVariant] = useState("success");

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

    try {
      const commentResult = await apiCreateComment(content, postId, userId);
      if (commentResult.status === 201) {
        resetForm();
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
      <Formik id="formik" onSubmit={console.log} initialValues={{}}>
        {({ resetForm }) => (
          <Form onSubmit={(e) => handleSubmit(e, resetForm)}>
            <Form.Group className="mb-3" controlId="new_comment_text">
              <EditorComponent setContent={setContent} />
            </Form.Group>
            <Button variant="primary" type="submit">
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
    </>
  );
};
export default NewComment;
