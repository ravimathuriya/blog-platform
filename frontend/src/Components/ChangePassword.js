import React, { useContext, useState } from "react";
import userContext from "./UserContext/UserContext";

function ChangePassword(props) {
  const [passwords, setPasswords] = useState({
    oldpassword: "",
    newpassword: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const { notify, updateToast } = props;

  const { changeUserPassword } = useContext(userContext);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    notify("In progress. Please wait...", "warning");
    const updatedPassword = await changeUserPassword(passwords);

    if (updatedPassword.message === "Please check the old password") {
      updateToast("Please check the credentials", "error");
    } else if (
      updatedPassword.message ===
      "New Password and confirm Password are different"
    ) {
      updateToast("New Password and confirm Password are different", "warning");
    } else if (
      updatedPassword.message ===
      "New Password should not be same as old password "
    ) {
      updateToast("New Password should not be same as old password", "error");
    } else if (updatedPassword.message === "Password updated successfully") {
      updateToast("Password updated successfully", "success");
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center row"
        style={{ height: "700px" }}
        id="passwordForm"
      >
        <section className="col-md-6 offset-md-3">
          <div className="card shadow p-5">
            <h3 className="text-uppercase text-center mb-4">Change Password</h3>

            <form name="myForm">
              <div className="form-group my-2">
                <label className="my-2">Enter Old Password</label>
                <input
                  className="form-control"
                  name="oldpassword"
                  type="text"
                  onChange={onChange}
                />
              </div>
              <div className="form-group my-2">
                <label className="my-2">Enter New Password</label>
                <input
                  className="form-control"
                  name="newpassword"
                  type="text"
                  onChange={onChange}
                />
              </div>

              <div className="form-group my-2">
                <label className="my-2">Confirm New Password</label>
                <input
                  className="form-control"
                  name="confirmPassword"
                  type="password"
                  onChange={onChange}
                />
              </div>

              <button
                type="submit"
                className="btn my-3"
                style={{ width: "fit-content", textAlign: "center" }}
                onClick={handleChangePassword}
              >
                Update Password
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default ChangePassword;
