import React, { useContext } from "react";
import "./Css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import userContext from "./UserContext/UserContext";
import ProfileDropdown from "./ProfileDropdown";

function Navbar(props) {
  const { notify, updateToast, userId, dismisToast, getUserInfo, fetchingUser } = props;
  const navigate = useNavigate();

  const { logoutUser } = useContext(userContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    notify("In progress. Please wait...", "warning");
    const user = await logoutUser();

    if (user.message === "User logged out successfully") {
      updateToast("User logged out successfully", "success");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userID");
      navigate("/login", { replace: true });
    } else {
      updateToast("You are not authorized", "error");
      navigate("/login", { replace: true });
    }
  };



  return (
    <>
      <div className="header-blue">
        <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              BloGGingWithUS
            </Link>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navcol-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="nav navbar-nav">
                <li className="nav-item" role="presentation">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link className="nav-link" to="/addblog">
                    Add Blog
                  </Link>
                </li>
              </ul>
              {!localStorage.getItem("accessToken") ? (
                <div style={{ position: "absolute", right: "50px" }}>
                  <form className="form-inline mr-auto" target="_self"></form>
                  <span className="navbar-text">
                    {" "}
                    <Link to="/login" className="login">
                      Log In
                    </Link>
                  </span>
                  <Link
                    className="btn btn-light action-button"
                    role="button"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div style={{ position: "absolute", right: "50px" }}>
                  <span className="navbar-text d-flex">
                    {" "}
                  <ProfileDropdown notify={notify} fetchingUser={fetchingUser} updateToast={updateToast} userId = {userId} handleLogout={handleLogout} dismisToast={dismisToast} getUserInfo= {getUserInfo} />
                  </span>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
