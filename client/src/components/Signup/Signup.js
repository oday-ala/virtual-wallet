import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import IMG from "../../assets/investor.svg";
import Logo from "../../assets/logo1.png";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
const Signup = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  let [msgError, setMsgError] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      phoneNo,
    };
    axios
      .post("http://localhost:3001/register", data)
      .then((res) => {
        console.log(res);
        if (res.data.status === "ok") {
          history.push("/login");
        } else {
          setMsgError(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <h2>Virtual Waleet Sign Up</h2>
          <h3>Create Account</h3>

          <form onSubmit={registerUser}>
            <div className="form-layout-container">
              <div className="row">
                <div className="col">
                  <span className="spann">
                    <i className="bi bi-envelope icon"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    // id="email"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span className="spann">
                    <i className="bi bi-envelope icon"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span className="spann">
                    <i className="bi bi-envelope icon"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span className="spann">
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
                    minLength="7"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span className="spann">
                    <i className="bi bi-key icon"></i>
                  </span>
                  <span className="spann">
                    <i className="bi bi-eye-slash icon"></i>
                  </span>
                  <input
                    type="date"
                    placeholder="Enter phone number"
                    name="dateOfBirth"
                    required
                    className="input"
                    value={dateOfBirth}
                    onChange={(e) => setdateOfBirth(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <span className="spann">
                    <i className="bi bi-key icon"></i>
                  </span>
                  <span className="spann">
                    <i className="bi bi-eye-slash icon"></i>
                  </span>
                  {
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={phoneNo}
                      onChange={setPhoneNo}
                    />
                  }
                </div>
              </div>
            </div>
            <button type="submit" id="submit">
              Sign Up
            </button>
            {msgError ? (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{msgError}</Alert>
              </Stack>
            ) : null}
            <p className="register">
              Already have an account?
              <Link to="/login"> Log In </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
