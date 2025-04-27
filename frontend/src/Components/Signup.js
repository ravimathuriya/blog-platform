import React, { useContext,  useState } from "react";
import "./Css/Signup.css";
import userContext from "./UserContext/UserContext";
import { useNavigate } from "react-router-dom";


function Signup(props) {
  const { registerUser } = useContext(userContext);

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    dob: "",
    country: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate()

  const { notify, updateToast} = props;

  const onChange = (e) => {
    if (e.target.type === "file") {
      // Handle file input separately
      const file = e.target.files[0];
      setProfilePic(file); // Set the profilePic state to the selected file
    } else {
      // Handle text input fields
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    notify( "In progress. Please wait...", "warning")
    const registeredUser = await registerUser(user, profilePic);
    console.log(registeredUser)

    if(registeredUser.message === 
      "All fields are required."){
      updateToast("Please check the credentials", "warning")
    }

    else if (registeredUser.message === 
      "User already exist"){
        updateToast("User already existed", "error")
      }

      else{
        updateToast("User registered successfully", "success")

        setTimeout(() => {
          navigate('/login', {replace:true});
        }, 2200);
      } 

  };

  return (
    <>
      <form className="container my-5">
        <div className="mb-3">
          <label htmlFor="exampleInputFullName" className="form-label">
            Full Name
          </label>
          <input
            name="fullName"
            type="fullName"
            className="form-control"
            id="exampleInputfullName"
            aria-describedby="FullNameHelp"
            onChange={onChange}
          />
        </div>
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

        <div className="mb-3">
          <label htmlFor="exampleInputDOB" className="form-label">
            Date of Birth
          </label>
          <input
            name="dob"
            type="dob"
            className="form-control"
            id="exampleInputDOB"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputcountry" className="form-label">
            Country
          </label>
          <input
            name="country"
            type="country"
            className="form-control"
            id="exampleInputcountry"
            onChange={onChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload the Profile Pic
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            id="profilePic"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn my-3" onClick={handleSubmit}>
          SignIn
        </button>
      </form>
    </>
  );
}

export default Signup;
