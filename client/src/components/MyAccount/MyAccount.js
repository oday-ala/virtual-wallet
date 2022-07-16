import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import "./MyAccount.css";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Spinner from "../Spinner/Spinner";
import { Fragment } from "react";
import React from "react";

export default function User() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [lodaing, setLoading] = useState(false);

  const accountShow = true;

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:3001/data", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setDateOfBirth(res.data.dateOfBirth);
        setPhoneNo(res.data.phoneNo);
        setLoading(false);
      });
  }, []);

  const EditAccountHandler = async () => {
    setLoading(true);

    const data = {
      firstName,
      lastName,
      phoneNo,
      accountShow,
    };
    await axios
      .post("http://localhost:3001/data", data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);

        console.log("Done");
      })
      .then((err) => {
        console.log(err);

        setLoading(false);
      });
  };

  const myAccount = (
    <div className="myAccount">
      <div className="myAccountTitleContainer">
        <h1 className="myAccountTitle">Edit Account</h1>
      </div>
      <div className="myAccountContainer">
        <div className="myAccountShow">
          <div className="myAccountShowTop">
            <div className="myAccountShowTopTitle">
              <span className="myAccountShowUsername">
                {firstName} {lastName}
              </span>
            </div>
          </div>
          <div className="myAccountShowBottom">
            <span className="myAccountShowTitle">Account Details</span>
            <div className="myAccountShowInfo">
              <PermIdentity className="myAccountShowIcon" />
              <span className="myAccountShowInfoTitle">{firstName}</span>
            </div>
            <div className="myAccountShowInfo">
              <CalendarToday className="myAccountShowIcon" />
              <span className="myAccountShowInfoTitle">{dateOfBirth}</span>
            </div>

            <span className="myAccountShowTitle">Contact Details</span>
            <div className="myAccountShowInfo">
              <PhoneAndroid className="myAccountShowIcon" />
              <span className="myAccountShowInfoTitle">{phoneNo}</span>
            </div>

            <div className="myAccountShowInfo">
              <MailOutline className="myAccountShowIcon" />
              <span className="myAccountShowInfoTitle">{email}</span>
            </div>
          </div>
        </div>
        <div className="myAccountUpdate">
          <span className="myAccountUpdateTitle">Edit</span>
          <form className="myAccountUpdateForm" onSubmit={EditAccountHandler}>
            <div className="myAccountUpdateLeft">
              <div className="myAccountUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  required
                  placeholder={firstName}
                  className="myAccountUpdateInput"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="myAccountUpdateItem">
                <label>Last Name</label>
                <input
                  required
                  type="text"
                  placeholder={lastName}
                  className="myAccountUpdateInput"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="myAccountUpdateItem">
                <label>Phone</label>
                {
                  <PhoneInput
                    placeholder="Enter phone number"
                    onChange={setPhoneNo}
                  />
                }
              </div>{" "}
            </div>
            <div className="myAccountUpdateRight">
              <button className="myAccountUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return <Fragment>{lodaing ? <Spinner /> : myAccount}</Fragment>;
}
