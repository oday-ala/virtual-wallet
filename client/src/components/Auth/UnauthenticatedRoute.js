import React from "react";
import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const ProtectedRoute = ({
  component: Component,
  name: fullName,
  email: email,

  ...rest
}) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <Fragment>
      {/* {console.log(navData)} */}
      {localStorage.isAuthenticated && (
        <Sidebar name={fullName} email={email} />
      )}
      {/* </div> */}
      <Route
        {...rest}
        render={(props) => {
          if (isAuthenticated) {
            return <Component {...props} {...rest} />;
          } else {
            console.log("redirect");
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </Fragment>
  );
};

export default ProtectedRoute;
