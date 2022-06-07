import { Table, Image } from "react-bootstrap";
import teste from "./teste.png";
import "./topicsStyles.css";

const TopicsTable = () => {
    return (
        <Table responsive striped bordered hover id="topics_table">
            <thead>
                <tr>
                    <th className="table_text_header d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                        Criador
                    </th>
                    <th className="table_text_header" style={{ width: "70.00%" }}>
                        Título
                    </th>
                    <th className="table_text_header d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                        Respostas
                    </th>
                    <th className="table_text_header d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                        Última Resposta
                    </th>
                </tr>
            </thead>
            <tbody id="topics_table_body">
                <tr>
                    <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                        <Image src={teste} alt="..." />
                    </td>
                    <td className="table_text_body_title" style={{ width: "70.00%" }}>
                        <div>ganhei o emblema empático e nem veio notif</div>
                        <div className="post_mobile_extra_information d-block d-sm-none">Criador por: Fulano | Respostas: 15 | Último post por: Ciclano 15 minutos atrás</div>
                    </td>
                    <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                        14
                    </td>
                    <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                        <div>Alan</div>
                        <div>12 minutos atrás</div>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

export default TopicsTable;
