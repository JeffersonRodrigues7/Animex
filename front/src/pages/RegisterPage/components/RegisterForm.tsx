import { useState, useContext } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import bcrypt from "bcryptjs";
import { FormGroup } from "./FormGroup";
import { AuthContext } from "../../../contexts/auth";
import "./styles.css";

const saltRounds = 10;

const scheme = yup.object().shape({
    user_name: yup
        .string()
        .matches(/^[a-zA-Z]./, "Nome de usuário deve começar com uma letra")
        .min(4, "Nome de usuário deve ter entre 4 a 15 caracteres")
        .max(15, "Nome de usuário deve ter entre 6 a 15 caracteres")
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
    user_email: yup.string().email("Email inválido").required("Campo obrigatório"),
    user_password: yup
        .string()
        .required("Campo obrigatório")
        .matches(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,15}$/, "Senha deve conter entre 8 a 15 caracteres, com pelo menos 1 letra e 1 número"),
    user_password_repeat: yup
        .string()
        .required("Campo obrigatório")
        .oneOf([yup.ref("user_password"), null], "As senhas devem coincidir"),
    user_accept_terms: yup.bool().oneOf([true], "É necessário aceitar os termos").required("Campo obrigatório"),
});

function RegisterForm() {
    //Os três estados abaixo são para o Alerta do formulário
    const { register } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [variant, setVariant] = useState("success");

    async function verifyUserUsed(user_name: String): Promise<Boolean> {
        try {
            const res = await axios({
                method: "get",
                url: "http://localhost:3001/users/userName/:userName",
                params: { userName: user_name },
            });
            console.log(res);
            return res.status === 204 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function verifyEmailUsed(user_email: String): Promise<Boolean> {
        try {
            const res = await axios({
                method: "get",
                url: "http://localhost:3001/users/email/:email",
                params: { email: user_email },
            });
            console.log(res);
            return res.status === 204 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    /*
    async function createUser(user_name: String, user_email: String, user_password: String): Promise<Boolean> {
        try {
            const res = await axios({
                method: "post",
                url: "http://localhost:3001/users",
                data: { userName: user_name, email: user_email, password: user_password },
            });
            console.log("RESP", res);
            return res.status === 201 ? true : false;
        } catch (error) {
            console.log("resp");
            console.error(error);
            return false;
        }
    }*/

    const handleSubmit = async (e: any, values: any, resetForm: any) => {
        e.preventDefault();
        const user_name = values.user_name;
        const user_email = values.user_email;
        const user_password = bcrypt.hashSync(values.user_password, saltRounds);

        const userUsed = await verifyUserUsed(user_name);
        const emailUsed = await verifyEmailUsed(user_email);

        setShow(true);
        setVariant("danger");

        //E-mail e nome de usuário não estão em uso
        if (!userUsed && !emailUsed) {
            const resPost = await register!(user_name, user_email, user_password);
            if (resPost) {
                setVariant("success");
                setShow(true);
                setText("Usuário criado com sucesso");
                //resetForm();
                setTimeout(function () {
                    setShow(false);
                }, 3000);
            } else {
                setShow(true);
                setText("Erro ao cadastrar Usuário");
                setVariant("danger");
            }
        }

        //E-mail ou nome de usuário já está em uso
        else if (!userUsed && emailUsed) setText("Email já em uso");
        else if (userUsed && !emailUsed) setText("Nome de usuário já em uso");
        else setText("Email e nome de usuário já em uso");
    };

    return (
        <>
            <Formik
                id="formik"
                validationSchema={scheme}
                onSubmit={console.log}
                validateOnMount={true}
                initialValues={{
                    user_name: "",
                    user_email: "",
                    user_password: "",
                    user_password_repeat: "",
                    user_accept_terms: false,
                }}
            >
                {({ handleChange, values, errors, isValid, dirty, resetForm }) => (
                    <Form id="form" className="px-3 py-2 border border-dark rounded" noValidate onSubmit={(e) => handleSubmit(e, values, resetForm)}>
                        <Alert show={show} variant={variant}>
                            <p>{text}</p>
                        </Alert>
                        <FormGroup
                            control_id="user_name"
                            label="Usuário"
                            type="user"
                            name="user_name"
                            placeholder="Nome de usuário"
                            form_text="Seu nick deve conter entre 4 a 15 caracteres, começando com uma letra do alfabeto"
                            handleChange={handleChange}
                            value={values.user_name}
                            error={errors.user_name}
                            isInvalid={!!errors.user_name}
                        />

                        <FormGroup
                            control_id="email"
                            label="E-mail"
                            type="email"
                            name="user_email"
                            placeholder="E-mail"
                            form_text="Digite um e-mail válido, vamos enviar uma mensagem de confirmação"
                            handleChange={handleChange}
                            value={values.user_email}
                            error={errors.user_email}
                            isInvalid={!!errors.user_email}
                        />

                        <FormGroup
                            control_id="password"
                            label="Senha"
                            type="password"
                            name="user_password"
                            placeholder="Senha"
                            form_text="Senha deve conter entre 8 a 15 caracteres, com pelo menos 1 letra e 1 número"
                            handleChange={handleChange}
                            value={values.user_password}
                            error={errors.user_password}
                            isInvalid={!!errors.user_password}
                        />

                        <FormGroup
                            control_id="password_repeat"
                            label="Confirmação de Senha"
                            type="password"
                            name="user_password_repeat"
                            placeholder="Senha"
                            form_text="Digite sua senha novamente"
                            handleChange={handleChange}
                            value={values.user_password_repeat}
                            error={errors.user_password_repeat}
                            isInvalid={!!errors.user_password_repeat}
                        />

                        <Form.Group className="mb-3" id="grid_checkbox_accept_rules">
                            <Form.Check
                                required
                                id="checkbox_terms"
                                type="checkbox"
                                name="user_accept_terms"
                                label="Aceito os Termos"
                                onChange={handleChange}
                                isInvalid={!!errors.user_accept_terms}
                                feedback={errors.user_accept_terms}
                                feedbackType="invalid"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!(isValid && dirty)}>
                            Registrar
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export { RegisterForm };
