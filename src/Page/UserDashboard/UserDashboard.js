import React, { Fragment } from "react";
import AuthService from "../../AuthService";
import ContainerUserDashboard from "../../Components/UserDashboard/ContainerUserDashboard";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const user = AuthService.getCurrentUser();
  return (
    <div>
      {!user ? (
        <Fragment>
          <div className="login-first">
            <div className="">
              <h1>Login First</h1>
              <Link to="/login" className="btn-1 btn-2">
                Login
              </Link>
            </div>
          </div>
        </Fragment>
      ) : (
        <ContainerUserDashboard />
      )}
    </div>
  );
};

export default UserDashboard;
