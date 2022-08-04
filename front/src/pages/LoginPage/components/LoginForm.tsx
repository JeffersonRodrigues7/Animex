import { useState, useContext, FormEvent } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../../contexts/contextAuth";
import "./loginFormStyle.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Os três estados abaixo são para o Alerta do formulário
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [variant, setVariant] = useState("success");

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const user_email: string = email;
    const user_password: string = password;

    const res_login: number = await login!(user_email, user_password);

    setVariant("danger");
    setShow(true);
    if (res_login === 0) {
      setText("Login com sucesso");
      setVariant("success");
    } else if (res_login === 1) setText("Usuário não encontrado");
    else if (res_login === 2) setText("Senha incorreta");
    else setText("Erro ao tentar fazer login");
  };

  return (
    <>
      <Form id="form" className="px-3 py-2 border border-dark rounded" noValidate onSubmit={(e) => handleSubmit(e)}>
        <Alert show={show} variant={variant}>
          <p>{text}</p>
        </Alert>

        <Form.Group className="mb-3" controlId="login_form_group_email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="login_form_group_password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" id="login_form_grid_checkbox_remain_logged">
          <Form.Check type="checkbox" label="Lembrar" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>
      <div>
        <a href="/register">Não possui uma conta? Clique aqui e cadastre-se</a>
      </div>
    </>
  );
};

export default LoginForm;
