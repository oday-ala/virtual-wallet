import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Offers from "./components/Withdrawal/Withdrawal";
import MyAccount from "./components/MyAccount/MyAccount";
import Transactions from "./components/Transactions/Transactions";
import FirstPage from "./components/firstPage/FirstPage";
import { useState } from "react";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import axios from "axios";
import Cards from "./components/Cards/Cards";
import UnauthenticatedRoute from "./components/Auth/UnauthenticatedRoute";
import ForgetPass from "./components/forgetPass/forgetPass";
import ResetPass from "./components/forgetPass/restPass/restPass";

function App() {
  const [points, setPoints] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const populatePoints = async () => {
    axios
      .get("http://localhost:3001/data", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((req) => {
        setPoints(req.data.points);
        let name = req.data.firstName + " " + req.data.lastName;
        setEmail(req.data.email);
        setName(name);
      });
  };

  return (
    <div>
      <Router>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/signup">
          <Signup></Signup>
        </Route>

        <div className="container">
          <Switch>
            <Route exact path="/reset-password">
              <ResetPass />
            </Route>
            <Route exact path="/forgetPass">
              <ForgetPass></ForgetPass>
            </Route>
            <UnauthenticatedRoute
              path="/home"
              component={Home}
              points={points}
              populatePoints={populatePoints}
              email={email}
              name={name}
            />

            <UnauthenticatedRoute
              path="/ads"
              component={FirstPage}
              email={email}
              name={name}
            />
            <UnauthenticatedRoute
              exact
              path="/cards"
              component={Cards}
              fullName={name}
              email={email}
              name={name}
            />

            <UnauthenticatedRoute
              exact
              path="/offers"
              component={Offers}
              email={email}
              name={name}
            />
            <UnauthenticatedRoute
              exact
              path="/myaccount"
              component={MyAccount}
              email={email}
              name={name}
            />

            <UnauthenticatedRoute
              exact
              path="/transactions"
              component={Transactions}
              email={email}
              name={name}
            />
            <Redirect from="*" to="/signup" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
