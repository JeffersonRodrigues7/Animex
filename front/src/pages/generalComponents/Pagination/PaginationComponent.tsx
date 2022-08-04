import { NavigateFunction, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import "./paginationComponentStyles.css";

interface Props {
  list_length: number;
  items_per_page: number;
  url: string;
  active_page: number;
}

const PaginationComponent = ({ list_length, items_per_page, url, active_page }: Props): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const total_pages: number = Math.ceil(list_length / items_per_page);
  const pages: number = 3; //Número de páginas que vão aparecer antes e depois da página atual(em azul)

  const paginate = async (page_number: number): Promise<void> => {
    navigate(`${url}/${page_number}`);
  };

  let subtractPages: number = active_page > 3 ? 3 : active_page - 1; //gambiarra para fazer com que na paginação mostremos a página ativa mais as 3 páginas anteriores
  let items: JSX.Element[] = [];

  if (active_page !== 1) {
    items.push(<Pagination.First key={-1} onClick={() => paginate(1)} />);
  }
  for (let index: number = active_page - subtractPages; index <= active_page + pages && index <= total_pages; index++) {
    items.push(
      <Pagination.Item key={index} active={index === active_page} onClick={() => paginate(index)}>
        {index}
      </Pagination.Item>
    );
  }
  if (active_page < total_pages) {
    items.push(<Pagination.Last key={-6} onClick={() => paginate(total_pages)} />);
  }

  return (
    <div id="pagination_div">
      <Pagination id="pagination_ul" size="sm">
        {items}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
