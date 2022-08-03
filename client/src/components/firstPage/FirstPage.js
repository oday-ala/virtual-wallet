import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import socialMedia from "../../assets/Social-Media-Marketing.jpg";
import outdoor from "../../assets/Outdoor.jpg";
import Logo from "../../assets/logo1.png";

import "./FirstPage.css";

class FirstPage extends Component {
  state = {
    points: { card1: 2, card2: 5, card3: 6 },
    totalPoints: 0,
    goTo: false,
  };

  updatePoints = async (type) => {
    let point = this.state.points[type];
    let newTotalPoints = point;
    const current = new Date();

    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const transactions = [
      { id: "card1", title: "Social Media Ads", points: 2 },
      { id: "card2", title: "Outdoor Ads", points: 5 },
      { id: "card3", title: "Full campaign", points: 6 },
    ];
    let tran = transactions.find((t) => t.id === type);
    console.log("t1", tran);

    tran = {
      ...tran,
      date,
      actions: "Earned",
    };
    const newPoints = { points: newTotalPoints, transactions: tran };

    await axios
      .post("http://localhost:3001/data", newPoints, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((req) => {
        console.log(req);
        alert(`Congrats you earn ${newTotalPoints}$`);
      });
    this.setState({ totalPoints: newTotalPoints });
  };

  pointsHandler = (type) => {
    this.updatePoints(type);
  };

  render() {
    return (
      <div className="container">
        <div className="cardAds">
          <div className="card-header">
            <img src={socialMedia} alt="rover" />
          </div>
          <div className="card-body">
            <span className="tag tag-teal">Social Media</span>
            <h4
              onClick={() => {
                this.updatePoints("card1");
              }}
            >
              Social Media Ads
            </h4>
            <p>make your ads be on Instagram, Facebook, and Tweeter</p>
            <p>
              <strong>{this.state.points.card1} Points</strong>
            </p>
          </div>
        </div>
        <div className="cardAds">
          <div className="card-header">
            <img src={outdoor} alt="ballons" />
          </div>
          <div className="card-body">
            <span className="tag tag-purple">Printing Ads</span>
            <h4 onClick={() => this.updatePoints("card2")}>Outdoor Ads</h4>
            <p>
              The future can be scary, but there are ways to deal with that
              fear.
            </p>
            <p>
              <strong>{this.state.points.card2} Points</strong>
            </p>
          </div>
        </div>
        <div className="cardAds">
          <div className="card-header">
            <img src={Logo} alt="city" />
          </div>
          <div className="card-body">
            <span className="tag tag-pink">Full campaign</span>
            <h4 onClick={() => this.updatePoints("card3")}>
              Publish your ads on all types of media
            </h4>

            <p>
              <strong>{this.state.points.card3} Points</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FirstPage);
