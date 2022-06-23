import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Figure, ListGroup } from "react-bootstrap";
import { Buffer } from "buffer";
import NewComment from "./NewComment";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { AuthContext } from "../../../contexts/contextAuth";
import { apiListComments } from "../../../services/api";
import { formatedData } from "../../../services/usefulFunctions";

import "./commentStyles.css";

interface commentsModel {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  postId: number;
  post: {
    text: string;
    createdAt: string;
  };
  user: {
    userName: string;
    profileImage: string | undefined;
  };
}

const Comment = () => {
  const { topicTitle, topicId } = useParams();
  const { id } = useContext(AuthContext);
  const [comments, setComments] = useState<commentsModel[]>([]);

  const handleUserImage = (image: Buffer) => {
    const base64Flag = "data:image/jpg;base64,";
    const b64Image = Buffer.from(image).toString();
    return base64Flag + b64Image;
  };

  useEffect(() => {
    async function fetchComments() {
      try {
        const commentList = await apiListComments(Number(topicId));
        const commentListData = commentList.data;

        //const contentBlock = htmlToDraft(commentListData.content)
        //const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        //const _editorState = EditorState.createWithContent(contentState);
        //setEditorState(_editorState);

        commentListData.map((comment: any) => {
          if (comment.user.profileImage) {
            comment.user.profileImage = handleUserImage(comment.user.profileImage);
          }
          comment.createdAt = formatedData(comment.createdAt);
        });

        setComments(commentListData);
      } catch (e: any) {
        console.log("Erro ao listar comentários", e);
      }
    }

    fetchComments();
  }, []);

  return (
    <div id="comment_body">
      <ListGroup id="comments_listGroup">
        {comments.map((comment: commentsModel) => (
          <ListGroup.Item key={comment.id}>
            <Figure.Image className="comment_profile_image" alt={comment.user.userName} src={comment.user.profileImage} />
            <div className="comment_profile_userName">{comment.user.userName} -</div>
            <div className="comment_time">{comment.createdAt}</div>
            <div className="comment_quote">Quotar</div>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} className="comment_text"></div>
            <div></div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr></hr>
      <NewComment postId={Number(topicId)} userId={id!}></NewComment>
    </div>
  );
};

export default Comment;
