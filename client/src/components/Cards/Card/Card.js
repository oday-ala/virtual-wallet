import "./Card.css";
import React from "react";
const Card = (props) => (
  <div className="cards">
    <figure className="card__figure">
      <p>{props.bankName} Bank</p>
    </figure>
    <div className="card__reader">
      <div className="card__reader--risk card__reader--risk-one"></div>
      <div className="card__reader--risk card__reader--risk-two"></div>
      <div className="card__reader--risk card__reader--risk-three"></div>
      <div className="card__reader--risk card__reader--risk-four"></div>
    </div>
    <p className="card__number">{props.accountNumber}</p>
    <div className="card__flag">
      <div className="card__flag--globe"></div>
      <div className="card__flag--red"></div>
      <div className="card__flag--yellow"></div>
      <div className="name">{props.name}</div>
    </div>
  </div>
);

export default Card;
