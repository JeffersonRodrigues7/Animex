import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import "./paginationComponentStyles.css";

interface Props {
  listLength: number;
  itemsPerPage: number;
  url: string;
  activePage: number;
}

export const PaginationComponent = ({ listLength, itemsPerPage, url, activePage }: Props) => {
  const navigate = useNavigate();
  const totalPages = Math.ceil(listLength / itemsPerPage);
  const pages = 3;

  const paginate = async (pageNumber: number) => {
    navigate(`${url}/${pageNumber}`);
  };

  let subtractPages = activePage > 3 ? 3 : activePage - 1; //gambiarra para fazer com que na paginação mostremos a página ativa mais as 3 páginas anteriores
  let items = [];

  if (activePage !== 1) {
    items.push(<Pagination.First key={-1} onClick={() => paginate(1)} />);
  }
  for (let index = activePage - subtractPages; index <= activePage + pages && index <= totalPages; index++) {
    items.push(
      <Pagination.Item key={index} active={index === activePage} onClick={() => paginate(index)}>
        {index}
      </Pagination.Item>
    );
  }
  if (activePage < totalPages) {
    items.push(<Pagination.Last key={-6} onClick={() => paginate(totalPages)} />);
  }

  return (
    <div id="pagination_div">
      <Pagination id="pagination_ul" size="sm">
        {items}
      </Pagination>
    </div>
  );
};
