import React from "react";
import classnames from "classnames";
import Header from "./Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import AddCardIcon from "@mui/icons-material/AddCard";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChatIcon from "@mui/icons-material/Chat";
// import "./Sidebar.css";

import { TrendingUp, AttachMoney } from "@material-ui/icons";
import "./Sidebar.css";

class Sidebar extends React.Component {
  state = {
    open: window.matchMedia("(min-width: 1024px)").matches || false,
  };

  ontoggleNav = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  render() {
    const { open } = this.state;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    console.log(mobile, open);
    return (
      <div>
        <div className="navHeaderWrap">
          <Header ontoggleNav={this.ontoggleNav} />
        </div>
        <div className="bodyWrap">
          <div className={classnames({ blur: mobile && open })} />
          <div
            className={classnames(
              "sidenav",
              { sidenavOpen: open },
              { sidenavClose: !open }
            )}
          >
            <a
              href="javascript:void(0)"
              className="closebtn hidex"
              onClick={() => this.ontoggleNav("0px")}
            >
              &times;
            </a>
            <ul className="sidebarList">
              <div className="intro">
                <li>{this.props.name}</li>
                <li>{this.props.email}</li>
              </div>
              <hr />

              <Link to="/home" className="link">
                <li>
                  <HomeIcon className="sidebarIcon" />
                  Home
                </li>
              </Link>
              <Link to="/offers" className="link">
                <li className="sidebarListItem">
                  <TrendingUp className="sidebarIcon" />
                  Offers
                </li>
              </Link>
              <Link to="/transactions" className="link">
                <li className="sidebarListItem">
                  <AttachMoney className="sidebarIcon" />
                  Transactions
                </li>
              </Link>
              <Link to="/myaccount" className="link">
                <li className="sidebarListItem">
                  <ManageAccountsIcon className="sidebarIcon" />
                  My Account
                </li>
              </Link>

              <Link to="/cards" className="link">
                <li className="sidebarListItem">
                  <AddCardIcon className="sidebarIcon" />
                  Cards
                </li>
              </Link>
              <Link to="/ads" className="link">
                <li className="sidebarListItem">
                  <ArrowBackIosNewIcon className="sidebarIcon" />
                  Earn Points
                </li>
              </Link>
            </ul>
          </div>

          <div
            className={classnames(
              "main",
              { mainShrink: open },
              { mainExpand: !open },
              { noscroll: mobile && open }
            )}
          ></div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
