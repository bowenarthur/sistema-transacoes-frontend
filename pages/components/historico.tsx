import React, { useState, useEffect } from "react";
import style from "../../styles/Historico.module.scss";
import axios from "axios";
import Head from "next/head";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

interface Transaction {
  id: string;
  creditedAccountId: string;
  debitedAccountId: string;
  value: number;
  creditedUser?: string;
  debitedUser?: string;
  createdAt: string;
}

export default function Historico() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsBackup, setTransactionsBackup] = useState<Transaction[]>([]);
  const [radioValue, setRadioValue] = useState("");

  const radios = [
    { name: "CashOut", value: "1" },
    { name: "CashIn", value: "2" },
    { name: "Data", value: "3" },
  ];

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get("http://localhost:8000/transactions", config)
      .then((res) => {
        setTransactions(res.data)
        setTransactionsBackup(res.data)
      })
      .catch((err) => console.log(err));
  }

  const getDate = (index: number) => {
    const date = new Date(transactions[index].createdAt);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const changeFilter = (radioValue: string) => {
    const accountId = localStorage.getItem("accountId");
    let filteredTransactions: Transaction[] = [];
    setRadioValue(radioValue);
    switch (radioValue) {
      case "1":
        filteredTransactions = transactionsBackup.filter(
          (transaction) =>
            transaction.creditedAccountId === accountId
        );
        break;
      case "2":
        filteredTransactions = transactionsBackup.filter(
          (transaction) =>
            transaction.debitedAccountId === accountId
        );
        break;
      case "3":
        filteredTransactions = transactionsBackup.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
    }
    setTransactions(filteredTransactions);
  };

  const renderTransactions = () => {
    if(transactions.length === 0) return <tr>Nenhuma transação encontrada</tr>
    return transactions.map((transaction: Transaction, index) => (
      <tr key={transaction.id}>
        <td>@{transaction.debitedUser}</td>
        <td>@{transaction.creditedUser}</td>
        <td>R${transaction.value.toFixed(2)}</td>
        <td>{getDate(index)}</td>
      </tr>
    ))
  };

  return (
    <div className={style.historico}>
      <Head>
        <title>NG.cash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.filtro}>
        <label>Filtrar por:</label>
        <ButtonGroup className="mb-2">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="dark"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => changeFilter(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <Table className={style.tabela}>
        <thead>
          <tr>
            <th>Debitado</th>
            <th>Creditado</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          { renderTransactions() }
        </tbody>
      </Table>
    </div>
  );
}
