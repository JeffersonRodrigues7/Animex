import { useState } from "react";
import { Table, Image, Pagination } from "react-bootstrap";
import teste from "./teste.png";
import "./topicsStyles.css";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [activePage, setActivePage] = useState(1);
  const postsQtd = posts.length;
  const totalPages = Math.ceil(postsQtd / postsPerPage);
  const pages = 3;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  };

  let subtractPages = activePage > 3 ? 3 : activePage - 1; //gambiarra para fazer com que na paginação mostremos a página ativa mais as 3 páginas anteriores
  let items = [];

  if (activePage !== 1) {
    items.push(<Pagination.First key={-1} onClick={() => paginate(1)} />);
    items.push(<Pagination.Prev key={-2} onClick={() => paginate(activePage - 1)} />);
  }
  for (let index = activePage - subtractPages; index <= activePage + pages && index <= totalPages; index++) {
    items.push(
      <Pagination.Item key={index} active={index === activePage} onClick={() => paginate(index)}>
        {index}
      </Pagination.Item>
    );
  }
  if (activePage < totalPages) {
    items.push(<Pagination.Next key={-5} onClick={() => paginate(activePage + 1)} />);
    items.push(<Pagination.Last key={-6} onClick={() => paginate(totalPages)} />);
  }
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
                <Image src={teste} alt="..." />
              </td>
              <td className="table_text_body_title" style={{ width: "70.00%" }}>
                <div>{post.title}</div>
                <div className="post_mobile_extra_information d-block d-sm-none">
                  Criador por: {post.creatorName} | Respostas: {post.replies} | Último post por: {post.lastUserPostName}, {post.updatedAt}
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
      <div>
        <Pagination size="sm">{items}</Pagination>
      </div>
    </>
  );
};

export default TopicsTable;
