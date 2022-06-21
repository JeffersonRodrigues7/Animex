import { Container, Row, Col, Figure, Form } from "react-bootstrap";
import test from "./download.png";
import "./commentStyles.css";

const Comment = () => {
  return (
    <div className="comment_body">
      <Figure.Image className="comment_profile_image" alt="profile_image" src={test} />
      <div className="comment_profile_userName">João da Silva -</div>
      <div className="comment_time">5 horas atrás</div>
      <div className="comment_quote">Quotar</div>
      <div className="comment_text">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
        specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.{" "}
      </div>
    </div>
  );
};

export default Comment;
