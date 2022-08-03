import React, { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import "./restPass.css";
import IMG from "../../../assets/investor.svg";
import Logo from "../../../assets/logo1.png";

import qureyString from "query-string";

const ResetPass = () => {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();

  const verifyToken = () => {
    return qureyString.parse(location.search);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const token = verifyToken();
    const data = {
      token,
      password,
    };

    await axios
      .post("http://localhost:3001/forgetPass/reset-password", data)
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => console.log(err));
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
          <h3>Reset Password</h3>

          <form onSubmit={submitHandler}>
            <div className="form-layout-container">
              <div className="row">
                <div className="col">
                  <span>
                    <i className="bi bi-envelope icon"></i>
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    className="input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button type="submit" id="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

    // <div className="signup_container">
    //   <div className="signup_form_container">
    //     <div className="left">
    //       <h1>Welcome Back</h1>
    //       <Link to="/">
    //         <button type="button" className="white_btn">
    //           Sing Up
    //         </button>
    //       </Link>
    //     </div>
    //     <div className="right">
    //       <form className="form_container" onSubmit={submitHandler}>
    //         <h1>Reset Password</h1>
    //         <label>Enter a new password</label>
    // <input
    //   type="password"
    //   placeholder="Password"
    //   name="password"
    //   required
    //   className="input"
    //   onChange={(e) => setPassword(e.target.value)}
    // />

    //         <button type="submit" className="green_btn">
    //           Submit
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};
export default ResetPass;
