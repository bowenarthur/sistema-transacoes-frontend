import React, { useState, useEffect } from "react";
import style from "../styles/Home.module.scss";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CashOut from "./components/cash-out";
import Historico from "./components/historico";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [key, setKey] = useState("historico");
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser(localStorage.getItem("username") as string);
      getBalance();
    } else router.push("./login");
  }, [router]);

  const getBalance = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .get("http://localhost:8000/conta/get-user", config)
      .then((res) => setBalance(res.data.balance))
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.clear();
    router.push("./login");
  };

  if (!user)
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <div className="dropdowns-loading">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      </div>
    );

  return (
    <div className={style.container}>
      <Head>
        <title>NG.cash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.main}>
        <h2>Bem-vindo @{user} </h2>
        <br />
        <h3>Saldo: {balance}</h3>
        <Tabs
          id="main-tab"
          activeKey={key}
          onSelect={(k) => {
            if (k) setKey(k);
          }}
          className="mb-3 w-75"
        >
          <Tab eventKey="historico" title="Histórico de transações">
            <Historico />
          </Tab>
          <Tab eventKey="cashout" title="Cash-out">
            <CashOut />
          </Tab>
        </Tabs>
        <Button
          variant="outline-dark"
          type="button"
          onClick={logout}
          className={style.submitButton}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
