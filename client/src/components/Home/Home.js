import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import "./Home.css";
import Widget from "../../components/Widget/Widget";
import jwt from "jsonwebtoken";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Home(props) {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        history.push("/login");
      } else {
        console.log(props);
        props.populatePoints();
        props.addingHandler();
      }
    }
  }, []);
  return (
    <div className="secondPart">
      <div className="home">
        <FeaturedInfo
          withdrawalBalance={props.withdrawalBalance}
          points={props.points}
        />

        <Widget />
      </div>
    </div>
  );
}
