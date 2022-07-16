import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import IMG from "../../assets/investor.svg";
import Logo from "../../assets/logo1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  let [msgError, setMsgError] = useState(null);

  const loginUser = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:3001/login", data)
      .then((res) => {
        if (res.data.user) {
          localStorage.setItem("token", res.data.user);
          // alert("Login Successfully");
          localStorage.setItem("isAuthenticated", "true");

          history.push("/home");
        } else {
          setMsgError(res.data.status);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container12">
      <div className="image-container">
        <div className="logo-header">
          <a href="/index.html" className="logo me-auto">
            <img src={Logo} alt="" className="img-fluid" />
          </a>
          <div>
            <div className="logo-header-full">
              <h1>Virtual Ads Management System</h1>
            </div>
            <div className="logo-header bottom">
              <div className="hl-className">
                <div className="hl one"></div>
                <div className="hl two"></div>
              </div>
              <p>One Stop Solution for Advertising</p>
            </div>
          </div>
        </div>
        <img src={IMG} className="image" alt="" />
      </div>
      <div className="form-container">
        <div className="form-layout">
          <h2>Virtual Waleet Login</h2>
          <h3>Login into your account</h3>

          <form onSubmit={loginUser}>
            <div className="form-layout-container">
              <div className="row">
                <div className="col">
                  <span>
                    <i className="bi bi-envelope icon"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span>
                    <i className="bi bi-key icon"></i>
                  </span>
                  <span>
                    <i className="bi bi-eye-slash icon"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {msgError ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{msgError}</Alert>
              </Stack>
            ) : null}

            <Link to="/forgetPass" className="link">
              Forgotten password?
            </Link>

            <button type="submit" id="submit">
              Login
            </button>

            <p className="register">
              Not a member?
              <Link to="/signup"> Register Here </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
