import React, { useContext, useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaAngleDown, FaAngleUp } from "react-icons/fa"; // Importing icons from react-icons
import "./Css/ProfileDropdown.css";
import userContext from "./UserContext/UserContext";
import { Link } from "react-router-dom";

function ProfileDropdown(props) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown

  const { handleLogout, getUserInfo } = props;

  const { getUserProfile } = useContext(userContext);

  const [existUser, setExistUser] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchProfile = async () => {
    // Notify user that profile fetch is in progress
    if (!isFetching) {
      setIsFetching(true); // Set fetching state to true to prevent duplicate toasts

      const userId = await localStorage.getItem("userID");

      if (!userId) {
        setIsFetching(false); // Set fetching to false after operation is complete
      } else {
        const user = await getUserProfile(userId);
        const userDetails = user.userDetails;
        setExistUser(userDetails);
        getUserInfo(userDetails);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  });

  return (
    <div
      className="nav-item dropdown"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <span
        onClick={toggleDropdown}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {" "}
        <img
          src={existUser.profilePic} // Example profile image
          alt="Profile"
          className="profile-img nav-link dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        {isOpen ? <FaAngleDown /> : <FaAngleUp />}{" "}
      </span>
      <span style={{ color: "white", paddingTop: "5px" }}>
        {" "}
        {existUser.fullName}{" "}
      </span>

      {isOpen && (
        <ul className="dropdown-list">
          <li className="dropdown-item">
            <Link
              to="/profile"
              style={{ color: "var(--bs-dropdown-link-color" }}
            >
              <FaUser /> View Profile
            </Link>
          </li>
          <li className="dropdown-item" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileDropdown;
