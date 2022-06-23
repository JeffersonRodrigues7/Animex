import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { apiCreateComment } from "../../../services/api";
import "./newCommentStyles.css";

interface Props {
  postId: number;
  userId: number;
}

const NewComment = ({ postId, userId }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
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
    const text: string = content;
    if (text.trim() === "") {
      console.log("here");
    }

    console.log(text);

    try {
      const commentResult = await apiCreateComment(text, postId, userId);
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
              <Editor
                placeholder="Novo comentário"
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(newState) => {
                  setEditorState(newState);
                  setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
                }}
              />
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
