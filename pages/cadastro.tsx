import React from "react";
import style from "../styles/Login.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import Head from "next/head";
import { Button } from "react-bootstrap";

export default function Login() {
  const router = useRouter();

  const cadastrar = (e: any) => {
    const data = {
      username: e.usuariocadastro,
      password: e.senhacadastro,
    };

    axios
      .post("http://localhost:8000/conta/signup", data)
      .then((res) => {
        alert("Cadastro realizado com sucesso!");
        router.push("./login");
      })
      .catch((err) => alert(err));
  }

  return (
    <div className={style.Login}>
      <Head>
        <title>NG.cash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.FormularioLogin}>
        <h2>Cadastro</h2>
        <Formik
        initialValues={{
          usuariocadastro: "",
          senhacadastro: "",
        }}
        onSubmit={cadastrar}
      >
        <Form className="d-flex flex-column justify-content-center mt-5">
          <Field
            type="text"
            id="usuariocadastro"
            placeholder="Usuário"
            name="usuariocadastro"
            size="20"
            required
          />
          <br />
          <Field
            type="password"
            id="senhacadastro"
            placeholder="Senha"
            name="senhacadastro"
            minLength="8"
            size="20"
            required
          />
          <br />
          <Button
            type="submit"
            variant="dark"
            name="botaocadastro"
          > Cadastrar </Button>
        </Form>
      </Formik>
      </div>
      
    </div>
  );
}
