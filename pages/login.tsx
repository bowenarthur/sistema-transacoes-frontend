import React from "react";
import style from "../styles/Login.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import Head from "next/head";
import Button from "react-bootstrap/Button";

export default function Login() {
  const router = useRouter();

  const login = (e: any) => {
    const data = {
      username: e.usuariologin,
      password: e.senhalogin,
    };

    axios
      .post("http://localhost:8000/conta/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("accountId", res.data.accountId);
        router.push("./");
      })
      .catch((err) => alert(err));
  };

  function cadastrar() {
    router.push("./cadastro");
  }

  return (
    <div className={style.Login}>
      <Head>
        <title>NG.cash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.FormularioLogin}>
        <h2>Login</h2>
        <Formik
          initialValues={{
            usuariologin: "",
            senhalogin: "",
          }}
          onSubmit={login}
        >
          <Form className="d-flex flex-column justify-content-center mt-5">
            <Field
              type="text"
              id="usuariologin"
              placeholder="Usuário"
              name="usuariologin"
              size="20"
              required
            />
            <br />
            <Field
              type="password"
              id="senhalogin"
              placeholder="Senha"
              name="senhalogin"
              minLength="8"
              size="20"
              required
            />
            <br />
            <p>
              Ainda não possui cadastro?{" "}
              <button className={style.BotaoTexto} onClick={cadastrar} type="button">
                Cadastrar
              </button>
            </p>
            <Button type="submit" variant="dark" name="botaologin">
              Entrar
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
