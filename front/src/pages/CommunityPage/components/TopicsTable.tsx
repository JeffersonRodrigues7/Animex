import { useState, useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Table, Image, Nav } from "react-bootstrap";
import { Buffer } from "buffer";
import PaginationComponent from "../../generalComponents/Pagination/PaginationComponent";
import { formatedData } from "../../../functions/usefulFunctions";
import { apiListTopics, apiQtdTopics } from "../../../services/api";
import "./topicsTableStyle.css";
import { AxiosResponse } from "axios";

interface TopicsModelInterface {
  id: number;
  last_user_comment_name: string;
  title: string;
  replies: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id?: number;
    profile_image_base64?: string;
    profile_image?: Buffer;
    username?: string;
  };
  user_id: number;
}

interface TopicDataUserInterface {
  id?: number | undefined;
  profile_image_base64?: string | undefined;
  profile_image?: Buffer | undefined;
  username?: string | undefined;
}

const TopicsTable = () => {
  const navigate: NavigateFunction = useNavigate();

  const { page } = useParams();
  const community_name = "animex"; //por enquanto vai ser uma constante

  const [topics, setTopics] = useState<TopicsModelInterface[]>([]);
  const [topicsQtd, setTopicsQtd] = useState(0);
  const [topicsPerPage] = useState(5);

  const fetchTopics = async (): Promise<void> => {
    var offset: number = Number(page) * topicsPerPage - topicsPerPage;

    try {
      const qtd_topics: AxiosResponse = await apiQtdTopics();
      setTopicsQtd(qtd_topics.data);

      const res_topics: AxiosResponse = await apiListTopics(offset, topicsPerPage);
      const topics_data: TopicsModelInterface[] = res_topics.data;

      for (let i = 0; i < topics_data.length; i++) {
        const topic_data_user: TopicDataUserInterface | undefined = topics_data[i].user;
        if (topic_data_user && topic_data_user.profile_image) {
          topic_data_user.profile_image_base64 = handleUserImage(topic_data_user.profile_image);
        }
        topics_data[i].updatedAt = formatedData(topics_data[i].updatedAt);
      }

      setTopics(topics_data);
    } catch (error: any) {
      console.error(`Error listing topics from community ${community_name}: `, error);
    }
  };

  const handleTopicClicked = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const topic_div: HTMLLinkElement = e.target as HTMLLinkElement;
    if (topic_div.textContent && topic_div.id) {
      const topic_clicked_title: string = topic_div.textContent;
      const topic_clicked_id: string = topic_div.id;
      navigate(`/topic/${topic_clicked_title}/${topic_clicked_id}/${1}`);
    }
  };

  const handleTopicAuxClicked = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    const topic_div: HTMLLinkElement = e.target as HTMLLinkElement;
    if (topic_div.textContent && topic_div.id) {
      const topic_clicked_title: string = topic_div.textContent;
      const topic_clicked_id: string = topic_div.id;
      window.open(`/topic/${topic_clicked_title}/${topic_clicked_id}/${1}`, "_blank");
    }
  };

  const handleUserImage = (image: Buffer): string => {
    const base64_flag: string = "data:image/jpg;base64,";
    const base64_image: string = Buffer.from(image).toString();
    return base64_flag + base64_image;
  };

  useEffect(() => {
    fetchTopics();
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
          {topics.map((topic: TopicsModelInterface) => (
            <tr key={topic.id}>
              <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                <Image className="table_image" src={topic.user?.profile_image_base64} alt={topic.user?.username} />
              </td>
              <td className="table_text_body_title" style={{ width: "70.00%" }}>
                <Nav.Link id={String(topic.id)} className="table_text_body_title_link" onClick={(e) => handleTopicClicked(e)} onAuxClick={(e) => handleTopicAuxClicked(e)}>
                  {topic.title}
                </Nav.Link>
                <div className="topic_mobile_extra_information d-block d-sm-none">
                  Criador por: {topic.user?.username} | Respostas: {topic.replies} | Último topic por: {topic.last_user_comment_name}, {topic.updatedAt}
                </div>
              </td>
              <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                {topic.replies}
              </td>
              <td className="table_text_body d-none d-sm-table-cell" style={{ width: "10.00%" }}>
                <div>{topic.last_user_comment_name}</div>
                <div>{topic.updatedAt}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationComponent list_length={topicsQtd} items_per_page={topicsPerPage} url={""} active_page={Number(page)}></PaginationComponent>
    </>
  );
};

export default TopicsTable;
