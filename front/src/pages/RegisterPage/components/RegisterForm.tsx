import { useState, useContext, FormEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import bcrypt from "bcryptjs";
import FormGroup from "./FormGroup";
import { AuthContext } from "../../../contexts/contextAuth";
import { apiFindUserByUsername, apiFindUserByEmail } from "../../../services/api";
import "./registerFormStyle.css";

interface FormValues {
  username: string;
  email: string;
  password: string;
  password_repeat: string;
  accept_terms: boolean;
}

const saltRounds: number = 10;

const scheme = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z]./, "Nome de usuário deve começar com uma letra")
    .min(4, "Nome de usuário deve ter entre 4 a 15 caracteres")
    .max(15, "Nome de usuário deve ter entre 4 a 15 caracteres")
    /**.test(
            "userName único",
            "Este nome de usuário já está em uso", // <- key, message
            function (value) {
                return new Promise((resolve, reject) => {
                    axios
                        .get("http://localhost:3001/users/userName/:userName", {
                            params: {
                                userName: value,
                            },
                        })
                        .then(function (response) {
                            if (response.status === 200) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                });
            }
        ) */
    .required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,15}$/, "Senha deve conter entre 8 a 15 caracteres, com pelo menos 1 letra e 1 número"),
  password_repeat: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password"), null], "As senhas devem coincidir"),
  accept_terms: yup.bool().oneOf([true], "É necessário aceitar os termos").required("Campo obrigatório"),
});

const RegisterForm = () => {
  const { register, login } = useContext(AuthContext);

  //Os três estados abaixo são para o Alerta do formulário
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [variant, setVariant] = useState("success");

  async function verifyUserUsed(username: string): Promise<boolean> {
    try {
      const res_username = await apiFindUserByUsername(username);
      return res_username.status === 204 ? true : false;
    } catch (error: any) {
      console.error(`Error checking if a user with username ${username} exists: `, error);
      return false;
    }
  }

  async function verifyEmailUsed(email: string): Promise<boolean> {
    try {
      const res_email = await apiFindUserByEmail(email);
      return res_email.status === 204 ? true : false;
    } catch (error: any) {
      console.error(`Error checking if a user with email ${email} exists: `, error);
      return false;
    }
  }

  const handleSubmit = async (e: FormEvent, values: FormValues): Promise<void> => {
    e.preventDefault();
    const username: string = values.username;
    const email: string = values.email;
    const password: string = bcrypt.hashSync(values.password, saltRounds);

    const user_used: boolean = await verifyUserUsed(username);
    const email_used: boolean = await verifyEmailUsed(email);

    setShow(true);
    setVariant("danger");
    if (!user_used && !email_used) {
      const access_level = 0;
      const biography = "";

      const res_register: boolean = await register!(username, email, password, access_level, biography);
      if (res_register) {
        //Se o registro foi feito com sucesso, então vamos fazer o login
        const res_login: number = await login!(email, values.password);
        if (res_login === 0) {
          setVariant("success");
          setText("Usuário cadastrado com sucesso, você será redirecionado para a tela principal");
        } else {
          setVariant("warning");
          setText("Usuário cadastrado com sucesso, porém, houve uma falha ao logar");
        }
      } else {
        setVariant("danger");
        setText("Erro ao cadastrar Usuário");
      }
    }

    //E-mail ou nome de usuário já está em uso
    else if (!user_used && email_used) setText("Email já em uso");
    else if (user_used && !email_used) setText("Nome de usuário já em uso");
    else setText("Email e nome de usuário já em uso");
  };

  return (
    <>
      <Formik
        id="formik"
        validationSchema={scheme}
        onSubmit={console.log}
        initialValues={{
          username: "",
          email: "",
          password: "",
          password_repeat: "",
          accept_terms: false,
        }}
      >
        {({ handleChange, values, errors, isValid, dirty }) => (
          <Form id="form" className="px-3 py-2 border border-dark rounded" noValidate onSubmit={(e) => handleSubmit(e, values)}>
            <Alert show={show} variant={variant}>
              <p>{text}</p>
            </Alert>
            <FormGroup
              control_id="username"
              label="Usuário"
              type="user"
              name="username"
              placeholder="Nome de usuário"
              form_text="Seu nick deve conter entre 4 a 15 caracteres, começando com uma letra do alfabeto"
              handleChange={handleChange}
              value={values.username}
              error={errors.username}
              isInvalid={!!errors.username}
            />

            <FormGroup
              control_id="email"
              label="E-mail"
              type="email"
              name="email"
              placeholder="E-mail"
              form_text="Digite um e-mail válido, vamos enviar uma mensagem de confirmação"
              handleChange={handleChange}
              value={values.email}
              error={errors.email}
              isInvalid={!!errors.email}
            />

            <FormGroup
              control_id="password"
              label="Senha"
              type="password"
              name="password"
              placeholder="Senha"
              form_text="Senha deve conter entre 8 a 15 caracteres, com pelo menos 1 letra e 1 número"
              handleChange={handleChange}
              value={values.password}
              error={errors.password}
              isInvalid={!!errors.password}
            />

            <FormGroup
              control_id="password_repeat"
              label="Confirmação de Senha"
              type="password"
              name="password_repeat"
              placeholder="Senha"
              form_text="Digite sua senha novamente"
              handleChange={handleChange}
              value={values.password_repeat}
              error={errors.password_repeat}
              isInvalid={!!errors.password_repeat}
            />

            <Form.Group className="mb-3" id="grid_checkbox_accept_rules">
              <Form.Check required id="checkbox_terms" type="checkbox" name="accept_terms" label="Aceito os Termos" onChange={handleChange} isInvalid={!!errors.accept_terms} feedback={errors.accept_terms} feedbackType="invalid" />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
              Registrar
            </Button>
          </Form>
        )}
      </Formik>
      <div>
        <a href="/login">Já possui uma conta? Clique aqui e faça o login</a>
      </div>
    </>
  );
};

export default RegisterForm;
