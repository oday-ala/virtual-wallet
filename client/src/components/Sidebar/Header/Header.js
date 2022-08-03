import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Header.css";
import { withRouter, Link } from "react-router-dom";

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    const { ontoggleNav } = this.props;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <span className="vLogo">Virtual Wallet</span>
            <span className="hmbger" onClick={ontoggleNav}>
              &#9776;
            </span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <SettingsIcon />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/myaccount" className="link">
                      Profile
                    </Link>
                  </DropdownItem>
                  {/* <DropdownItem>Option 2</DropdownItem> */}
                  <DropdownItem divider />
                  {console.log(this.props)}
                  <DropdownItem>
                    <p
                      onClick={() => {
                        localStorage.clear();
                        this.props.history.push("/signup");
                      }}
                    >
                      Logout
                    </p>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
