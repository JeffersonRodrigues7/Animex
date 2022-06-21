import { useState } from "react";
import { Table, Image, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PaginationComponent } from "../../generalComponents/Pagination/PaginationComponent";
import teste from "./teste.png";
import "./topicsTableStyles.css";

interface Props {
  posts: {
    id: number;
    title: string;
    text: string;
    creatorId: string;
    creatorName: string;
    lastUserPostName: string;
    replies: number;
    createdAt: string;
    updatedAt: string;
  }[];
}

const TopicsTable = ({ posts }: Props) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const postsQtd = posts.length;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleTopicClicked = (e: any) => {
    const postClickedTitle: string = e.target.text;
    const postClickedId: string = e.target.id;
    navigate(`/topic/${postClickedTitle}/${postClickedId}`);
  };

  return (
    <>
      <Table responsive striped bordered hover id="topics_table">
        <thead>
          <tr>
            <th id="title_header" className="table_text_header d-none d-sm-table-cell" style={{ width: "10.00%" }}>
              Criador
            </th>
            <th id="text_header" className="table_text_header_title" style={{ width: "70.00%" }}>
              Título
            </th>
            <th id="replies_header" className="table_text_header d-none d-sm-table-cell" style={{ width: "10.00%" }}>
              Respostas
            </th>
            <th id="last_answer_header" className="table_text_header d-none d-sm-table-cell" style={{ width: "10.00%" }}>
              Última Resposta
            </th>
          </tr>
        </thead>
        <tbody id="topics_table_body">
          {currentPosts.map((post: any) => (
            <tr key={post.id}>
              <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                <Image className="table_image" src={post.user.profileImage} alt={post.user.userName} />
              </td>
              <td className="table_text_body_title" style={{ width: "70.00%" }}>
                <Nav.Link id={post.id} className="table_text_body_title_link" onClick={(e) => handleTopicClicked(e)}>
                  {post.title}
                </Nav.Link>
                <div className="post_mobile_extra_information d-block d-sm-none">
                  Criador por: {post.user.userName} | Respostas: {post.replies} | Último post por: {post.lastUserPostName}, {post.updatedAt}
                </div>
              </td>
              <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                {post.replies}
              </td>
              <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                <div>{post.lastUserPostName}</div>
                <div>{post.updatedAt}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationComponent postsLength={postsQtd} setCurrentPage={setCurrentPage} postsPerPage={postsPerPage}></PaginationComponent>
    </>
  );
};

export default TopicsTable;
