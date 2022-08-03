import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import amazon from "../../../assets/amazon.jpg";
import udemy from "../../../assets/udemy.jpg";

class FirstPage extends Component {
  state = {
    points: { card1: 2, card2: 5, card3: 6, card4: 15, card5: 20 },
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
      { id: "card1", title: "Amazon coupons 2p", points: 2 },
      { id: "card2", title: "Amazon coupons 5p", points: 5 },
      { id: "card3", title: "Amazon coupons 6p", points: 6 },
      { id: "card4", title: "Udemy coupons 15p", points: 15 },
      { id: "card5", title: "Udemy coupons 20p", points: 20 },
    ];
    let tran = transactions.find((t) => t.id === type);
    console.log("t1", tran);

    tran = {
      ...tran,
      actions: "Deducted",
      date,
    };
    console.log("t", tran);
    const newPoints = {
      points: newTotalPoints,
      transactions: tran,
      showEarn: true,
    };

    await axios
      .post("http://localhost:3001/data", newPoints, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else alert(` ${newTotalPoints}$ is Deducted From Your Total Points`);
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
            <img src={amazon} alt="rover" />
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
            <img src={amazon} alt="ballons" />
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
            <img src={amazon} alt="city" />
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
        <div className="cardAds">
          <div className="card-header">
            <img src={udemy} alt="ballons" />
          </div>
          <div className="card-body">
            <span className="tag tag-purple">Printing Ads</span>
            <h4 onClick={() => this.updatePoints("card4")}>Outdoor Ads</h4>
            <p>
              The future can be scary, but there are ways to deal with that
              fear.
            </p>
            <p>
              <strong>{this.state.points.card4} Points</strong>
            </p>
          </div>
        </div>
        <div className="cardAds">
          <div className="card-header">
            <img src={udemy} alt="ballons" />
          </div>
          <div className="card-body">
            <span className="tag tag-purple">Printing Ads</span>
            <h4 onClick={() => this.updatePoints("card5")}>Outdoor Ads</h4>
            <p>
              The future can be scary, but there are ways to deal with that
              fear.
            </p>
            <p>
              <strong>{this.state.points.card5} Points</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FirstPage);
