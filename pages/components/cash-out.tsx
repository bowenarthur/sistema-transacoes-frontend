import React from "react";
import style from "../../styles/Cashout.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import Head from "next/head";

export default function CashOut() {
  const router = useRouter();

  const cashout = (e: any) => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
    const data = {
      toUsername: e.usuario,
      value: e.valor,
    };

    axios
      .post("http://localhost:8000/cashout", data, config)
      .then((res) => {
        alert("Cash-out realizado com sucesso!");
        location.reload();
      })
      .catch((err) => alert(err));
  }

  return (
    <div className={style.cashout}>
      <Head>
        <title>NG.cash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Formik
        initialValues={{
          usuario: "",
          valor: "",
        }}
        onSubmit={cashout}
      >
        <Form className={style.FormularioLogin}>
          <Field
            type="text"
            id="usuario"
            placeholder="Usuário"
            name="usuario"
            size="20"
            required
          />
          <br />
          <Field
            type="number"
            id="valor"
            placeholder="Valor"
            name="valor"
            size="20"
            required
          />
          <br />
          <Field
            type="submit"
            className="btn btn-dark"
            value="Cash-out"
            name="botaocashout"
          />
        </Form>
      </Formik>
    </div>
  );
}
