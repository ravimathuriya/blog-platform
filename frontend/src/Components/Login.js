import React, {  useContext, useState } from "react";
import userContext from "./UserContext/UserContext";
import { useNavigate } from "react-router-dom";


function Login(props) {
  const { loginUser } = useContext(userContext);
  const navigate = useNavigate();

  const { notify, updateToast } = props;

  const [existUser, setExistUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setExistUser({ ...existUser, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    notify("In progress. Please wait...", "warning");
    const loggedUser = await loginUser(existUser);
    

    if (loggedUser.message === "User loggedin successfully") {
      const existedUser = await loggedUser.loggedUser
      const name = existedUser.fullName
      const id = existedUser._id
      localStorage.setItem("accessToken", loggedUser.accessToken);
      localStorage.setItem("userID", id)
      updateToast(`Hi ${name}! Welcome to the BloGGingWithUS`, "success");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2500);
    } else if (loggedUser.message === "User not registered") {
      updateToast("User not registered", "error");
    } else {
      updateToast("Please check the credentials", "warning");
    }
  };


  return (
    <>
      <form className="container my-5">
        <div className="mb-3">
          <label htmlFor="exampleInputDescription" className="form-label">
            Username
          </label>
          <input
            name="username"
            type="username"
            className="form-control"
            id="exampleInputusername"
            onChange={onChange}
          />
        </div>
        <div
          className="mb-3"
          style={{ color: "red", textAlign: "center", fontSize: "17px" }}
        >
          -or-
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            E-mail
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn my-3" onClick={handleLogin}>
          Log In
        </button>
      </form>

    </>
  );
}

export default Login;
