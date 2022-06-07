import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { BsPlusCircleFill } from "react-icons/bs";
import "./topicsStyles.css";

const NewTopic = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button id="new_topic_button" className="px-0 py-0 shadow-none" variant="link" onClick={handleShow}>
                <BsPlusCircleFill size={40} id="new_topic_icon" />
            </Button>

            <Modal id="new_topic_modal" size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Novo Tópico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="new_topic_modal_title">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="title" autoFocus />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="new_topic_modal_text">
                            <Form.Label>Conteúdo</Form.Label>
                            <Form.Control as="textarea" rows={6} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Criar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewTopic;
