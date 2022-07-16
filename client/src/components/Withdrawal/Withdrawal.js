import React from "react";

import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./Withdrawal.css";
import History from "./History/History";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { withColumns } from "../Data/Data";
import Spinner from "../Spinner/Spinner";

const Withdrawal = (props) => {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [accountNo, setAccountNo] = useState("");
  const [amount, setamount] = useState("");
  const [dataGridRows, setDataGridRows] = useState([]);

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const [msgUpdate, setMsgUpdate] = useState(null);
  const [lodaing, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      axios
        .get("http://localhost:3001/withdrawal", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          res.data = res.data.data;
          Object.keys(res.data).forEach((key) => {
            setDataGridRows((dataGridRows) => [
              ...dataGridRows,
              {
                id: res.data[key].id,
                amount: res.data[key].amount,
                date: res.data[key].date,
                accountNo: res.data[key].accountNo,
              },
            ]);
            setamount(res.data[key].amount);
          });
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  }, []);

  const withdrawalHandler = (e) => {
    e.preventDefault();
    const withdrawalInfo = {
      accountNo: accountNo,
      amount: amount,
      date: date,
      id: small_id,
    };
    props.addingHandler(amount);

    axios
      .post("http://localhost:3001/withdrawal", withdrawalInfo, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Done");
      })
      .catch((err) => {
        console.log(err);
      });

    setMsgUpdate("The Process Is Done Successfully!");
  };

  const handleChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === "accountNo") setAccountNo(value);
    else if (name === "amount") setamount(value);
  };

  const dataGrid = <History rows={dataGridRows} columns={withColumns} />;
  return (
    <div className="withdrawal">
      <h1 className="withdrawalTitle">Withdrawal</h1>
      <form className="withdrawalForm" onSubmit={withdrawalHandler}>
        <div className="withdrawalItem">
          <label>Amount</label>
          <input
            type="text"
            placeholder="100$"
            name="amount"
            onChange={handleChange}
          />
        </div>
        <div className="withdrawalItem">
          <label>Account Number</label>
          <input
            type="text"
            name="accountNo"
            placeholder="123456XXXXX"
            onChange={handleChange}
          />
        </div>
        <button className="withdrawalButton">Withdraw</button>
      </form>
      {msgUpdate ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{msgUpdate}</Alert>;
        </Stack>
      ) : null}
      {lodaing ? <Spinner /> : dataGrid}
    </div>
  );
};
export default withRouter(Withdrawal);
