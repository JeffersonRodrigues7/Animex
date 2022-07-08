import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Image, Nav } from "react-bootstrap";
import { Buffer } from "buffer";
import { formatedData } from "../../../services/usefulFunctions";
import { apiListPosts, apiQtdPosts } from "../../../services/api";
import { PaginationComponent } from "../../generalComponents/Pagination/PaginationComponent";
import "./topicsTableStyles.css";

export interface postsModel {
  id: number;
  title: string;
  text: string;
  creatorId: string;
  creatorName: string;
  lastUserPostName: string;
  replies: number;
  createdAt: string;
  updatedAt: string;
}

const TopicsTable = () => {
  const navigate = useNavigate();

  const { page } = useParams();
  const [posts, setPosts] = useState<postsModel[]>([]);
  const [postsQtd, setPostsQtd] = useState(0);
  const [postsPerPage] = useState(5);

  const fetchPosts = async () => {
    var offset = Number(page) * postsPerPage - postsPerPage;

    try {
      const qtdPosts = await apiQtdPosts();
      setPostsQtd(qtdPosts.data);

      const postList = await apiListPosts(offset, postsPerPage);
      const postListData = postList.data;

      postListData.map((post: any) => {
        post.user.profileImage = handleUserImage(post.user.profileImage);
        post.updatedAt = formatedData(post.updatedAt);
      });

      setPosts(postListData);
    } catch (e: any) {
      console.log("Erro ao listar posts", e);
    }
  };

  const handleTopicClicked = (e: any) => {
    console.log(e.target);
    const postClickedTitle: string = e.target.text;
    const postClickedId: string = e.target.id;
    navigate(`/topic/${postClickedTitle}/${postClickedId}/${1}`);
  };

  const handleTopicAuxClicked = (e: any) => {
    console.log(e.target);
    const postClickedTitle: string = e.target.text;
    const postClickedId: string = e.target.id;
    window.open(`/topic/${postClickedTitle}/${postClickedId}/${1}`, "_blank");
  };

  const handleUserImage = (image: Buffer) => {
    const base64Flag = "data:image/jpg;base64,";
    const b64Image = Buffer.from(image).toString();
    return base64Flag + b64Image;
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

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
          {posts.map((post: any) => (
            <tr key={post.id}>
              <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                <Image className="table_image" src={post.user.profileImage} alt={post.user.userName} />
              </td>
              <td className="table_text_body_title" style={{ width: "70.00%" }}>
                <Nav.Link id={post.id} className="table_text_body_title_link" onClick={(e) => handleTopicClicked(e)} onAuxClick={(e) => handleTopicAuxClicked(e)}>
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
      <PaginationComponent listLength={postsQtd} itemsPerPage={postsPerPage} url={""} activePage={Number(page)}></PaginationComponent>
    </>
  );
};

export default TopicsTable;
