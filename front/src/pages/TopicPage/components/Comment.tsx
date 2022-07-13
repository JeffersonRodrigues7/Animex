import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Figure, ListGroup } from "react-bootstrap";
import { Buffer } from "buffer";
import NewComment from "./NewComment";
import { socket } from "../../../services/apiSocket";
import { AuthContext } from "../../../contexts/contextAuth";
import { apiListComments, apiQtdComments } from "../../../services/api";
import { formatedData } from "../../../services/usefulFunctions";
import { PaginationComponent } from "../../generalComponents/Pagination/PaginationComponent";
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
  const { topicTitle, topicId, page } = useParams();
  const { id } = useContext(AuthContext);
  const [comments, setComments] = useState<commentsModel[]>([]);

  const [commentsQtd, setCommentsQtd] = useState(0);
  const [commentsPerPage, setCommentsPerPage] = useState(7);

  const fetchComments = async () => {
    var offset = Number(page) * commentsPerPage - commentsPerPage;

    try {
      const qtdComments = await apiQtdComments(Number(topicId));
      setCommentsQtd(qtdComments.data);

      const commentList = await apiListComments(Number(topicId), offset, commentsPerPage);
      const commentListData = commentList.data;

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
  };

  const fetchNewComment = async (Newcomment: any) => {
    if (Newcomment.user.profileImage) {
      Newcomment.user.profileImage = handleUserImage(Newcomment.user.profileImage);
    }
    Newcomment.createdAt = formatedData(Newcomment.createdAt);
    setComments((prevtState) => [...prevtState, Newcomment]);
  };

  const handleUserImage = (image: Buffer) => {
    const base64Flag = "data:image/jpg;base64,";
    const b64Image = Buffer.from(image).toString();
    return base64Flag + b64Image;
  };

  useEffect(() => {
    socket.on("update_topic", (data: commentsModel) => {
      let paginationUL: HTMLElement = document.getElementById("pagination_ul")!;
      let paginationLastLI = paginationUL.children[paginationUL?.children.length - 1];
      if (data.postId === Number(topicId) && paginationLastLI.classList.contains("active")) {
        fetchNewComment(data);
      }
    });
  }, [socket]);

  useEffect(() => {
    fetchComments();
  }, [page]);

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

      <PaginationComponent listLength={commentsQtd} itemsPerPage={commentsPerPage} url={`/topic/${topicTitle}/${topicId}`} activePage={Number(page)}></PaginationComponent>

      <hr></hr>

      <NewComment postId={Number(topicId)} userId={id!} fetchList={fetchComments}></NewComment>
    </div>
  );
};

export default Comment;
