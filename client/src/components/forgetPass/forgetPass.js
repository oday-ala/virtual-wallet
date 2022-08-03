import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./forgetPass.css";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import IMG from "../../assets/investor.svg";
import Logo from "../../assets/logo1.png";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState();
  const [status, setStatus] = useState();

  const loginUser = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    axios
      .post("http://localhost:3001/forgetPass", data)
      .then((res) => {
        if (res.data.status === 200) {
          setShowAlert(res.data.msg);
          setStatus("success");
        } else if (res.data.status === 205) {
          setShowAlert(res.data.msg);
          setStatus("error");
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
          <h2>Virtual Waleet</h2>
          <h3>Forget Password</h3>

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
            </div>
            {showAlert ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity={status}>{showAlert}</Alert>
              </Stack>
            ) : null}

            <button type="submit" id="submit">
              Submit
            </button>
            <p className="register">
              <Link to="/login">Go Back</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
