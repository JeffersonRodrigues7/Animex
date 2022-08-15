import { useState, useEffect, useContext, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Figure, ListGroup, Nav } from "react-bootstrap";
import { Buffer } from "buffer";
import NewComment from "./NewComment";
import PaginationComponent from "../../generalComponents/Pagination/PaginationComponent";
import { AuthContext } from "../../../contexts/contextAuth";
import { formatedData } from "../../../functions/usefulFunctions";
import { handleContent } from "../../../functions/handleQuote";
import { apiListComments, apiQtdComments } from "../../../services/api";
import { socket } from "../../../services/apiSocket";
import "./commentStyle.css";
import { AxiosResponse } from "axios";

interface CommentsModelInterface {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  topic_id: number;
  user?: {
    username?: string;
    profile_image_base64?: string;
    profile_image?: Buffer;
  };
  user_id: number;
}

interface CommentDataUserInterface {
  username?: string | undefined;
  profile_image_base64?: string | undefined;
  profile_image?: Buffer | undefined;
}

const Comment = () => {
  const { topicTitle, topicId, page } = useParams();
  const { id } = useContext(AuthContext);
  const [comments, setComments] = useState<CommentsModelInterface[]>([]);

  const [newCommentContent, setNewCommentContent] = useState<string>("");
  const [commentsQtd, setCommentsQtd] = useState(0);
  const [commentsPerPage] = useState(7);

  const [hide_text_area, setHideTextArea] = useState(true);

  const fetchComments = async (): Promise<void> => {
    var offset: number = Number(page) * commentsPerPage - commentsPerPage;

    try {
      const qtd_comments: AxiosResponse = await apiQtdComments(Number(topicId));
      setCommentsQtd(qtd_comments.data);

      const comments: AxiosResponse = await apiListComments(Number(topicId), offset, commentsPerPage);
      const comments_data: CommentsModelInterface[] = comments.data;

      for (let i: number = 0; i < comments_data.length; i++) {
        const comment_data_user: CommentDataUserInterface | undefined = comments_data[i].user;
        if (comment_data_user && comment_data_user.profile_image) {
          comment_data_user.profile_image_base64 = handleUserImage(comment_data_user.profile_image);
        }

        comments_data[i].createdAt = formatedData(comments_data[i].createdAt);
      }

      setComments(comments_data);
    } catch (error: any) {
      console.error(`Error listing comments from topic ${topicTitle}: `, error);
    }
  };

  const fetchNewComment = async (Newcomment: CommentsModelInterface): Promise<void> => {
    if (Newcomment.user?.profile_image) {
      Newcomment.user.profile_image_base64 = handleUserImage(Newcomment.user.profile_image);
    }
    Newcomment.createdAt = formatedData(Newcomment.createdAt);
    setComments((prevtState) => [...prevtState, Newcomment]);
  };

  const handleUserImage = (image: Buffer): string => {
    const base64_flag: string = "data:image/jpg;base64,";
    const base64_image: string = Buffer.from(image).toString();
    return base64_flag + base64_image;
  };

  useEffect(() => {
    socket.on("update_topic", (data: CommentsModelInterface) => {
      let pagination_ul: HTMLElement = document.getElementById("pagination_ul")!;
      let pagination_last_li = pagination_ul.children[pagination_ul?.children.length - 1];
      //console.log(data.text);
      if (data.topic_id === Number(topicId) && pagination_last_li.classList.contains("active")) {
        fetchNewComment(data);
      }
    });
  }, [socket]);

  useEffect(() => {
    fetchComments();
  }, [page]);

  const handleQuote = (commentId: number, e: FormEvent): void => {
    e.preventDefault();
    const comment_id_search: string = "comment_" + String(commentId);
    const comment_text_div: HTMLCollection | undefined = document.getElementById(comment_id_search)?.children;
    if (comment_text_div) {
      setHideTextArea(false);
      const quote_content: string = handleContent(comment_text_div);
      console.log(quote_content);
      setNewCommentContent((prevtState) => prevtState + newCommentContent);
    }
  };

  return (
    <div id="comment_body">
      <ListGroup id="comments_listGroup">
        {comments.map((comment: CommentsModelInterface) => (
          <ListGroup.Item key={comment.id}>
            <Figure.Image className="comment_profile_image" alt={comment.user?.username} src={comment.user?.profile_image_base64} />
            <div className="comment_profile_username">{comment.user?.username} - </div>
            <div className="comment_time">{comment.createdAt}</div>
            <div className="comment_quote">
              <Nav.Link
                className="comment_quote_link"
                onClick={(e) => {
                  handleQuote(comment.id, e);
                }}
              >
                Quotar
              </Nav.Link>
            </div>
            <div id={"comment_" + String(comment.id)} dangerouslySetInnerHTML={{ __html: comment.text }} className="comment_text"></div>
            <div></div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr></hr>
      <PaginationComponent list_length={commentsQtd} items_per_page={commentsPerPage} url={`/topic/${topicTitle}/${topicId}`} active_page={Number(page)}></PaginationComponent>
      <hr></hr>
      <NewComment topic_id={Number(topicId)} user_id={id!} hide_text_area={hide_text_area} setHideTextArea={setHideTextArea} new_comment_content={newCommentContent} setNewCommentContent={setNewCommentContent}></NewComment>
    </div>
  );
};

export default Comment;
