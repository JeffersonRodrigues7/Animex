import { useState } from "react";
import { Pagination } from "react-bootstrap";
import "./paginationComponentStyles.css";

interface Props {
  postsLength: number;
  setCurrentPage: Function;
  postsPerPage: number;
}

export const PaginationComponent = ({ postsLength, setCurrentPage, postsPerPage }: Props) => {
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(postsLength / postsPerPage);
  const pages = 3;

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
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  );
};
