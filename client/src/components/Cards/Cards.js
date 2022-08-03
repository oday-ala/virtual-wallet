import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card/Card";
import "./Cards.css";
const Cards = (props) => {
  const [bankName, setBankName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [dataCards, setDataCards] = useState([]);
  const [show, setShow] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      bankName,
      accountNumber,
    };
    axios
      .post("http://localhost:3001/cards", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Done");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/cards", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          res.data = res.data.data;
          Object.keys(res.data).forEach((key) => {
            setDataCards((card) => [
              ...card,
              {
                bankName: res.data[key].bankName,
                accountNumber: res.data[key].accountNumber,
              },
            ]);
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cardHandler = () => {
    let newShow = !show;
    setShow(newShow);
  };

  return (
    <div className="cardPage">
      <h1 className="withdrawalTitle">Cards</h1>
      <form className="withdrawalForm" onSubmit={submitHandler}>
        <div className="withdrawalItem">
          <label>Bank's Name</label>
          <select
            required
            onChange={(event) => setBankName(event.target.value)}
          >
            <option value="BB">Bank of Baroda</option>
            <option value="BI">Bank of India</option>
            <option value="BM">Bank of Maharashtra</option>
            <option value="CB">Canara Bank</option>
            <option value="CBN">Central Bank of India</option>
            <option value="IB">Indian Bank</option>
            <option value="IOB">Indian Overseas Bank</option>
            <option value="PSB">Punjab and Sind Bank</option>
            <option value="PNB">Punjab National Bank</option>
            <option value="SBI">State Bank of India</option>
            <option value="UCO">UCO Bank</option>
            <option value="UBI">Union Bank of India</option>
            <option value="Axis">Axis Bank</option>
            <option value="HDFC">HDFC Bank</option>
            <option value="IDFC-FB">IDFC First Bank</option>
            <option value="KB">Karnataka Bank</option>
            <option value="NB">Nainital Bank</option>
            <option value="YB">Yes Bank </option>
            <option value="CUB">City Union Bank</option>
            <option value="ICICI">ICICI Bank</option>
          </select>
        </div>
        <div className="withdrawalItem">
          <label>Account Number</label>
          <input
            required
            type="text"
            name="accountNo"
            placeholder="XXXXXx123"
            onChange={(e) => {
              setAccountNumber(e.target.value);
            }}
          />
        </div>
        <button className="withdrawalButton">Add Card</button>
      </form>
      <button className="withdrawalButton" onClick={cardHandler}>
        Show My Cards
      </button>
      <div className="acard">
        {show
          ? dataCards.map((card) => {
              return (
                <div className="cards">
                  <Card
                    bankName={card.bankName}
                    accountNumber={card.accountNumber}
                    name={props.name}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Cards;
