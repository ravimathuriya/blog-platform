import userContext from "./UserContext";

const url = "https://blog-platform-backend-9q8x.onrender.com/api/v1/users";

const UserState = (props) => {
  const registerUser = async (
    { fullName, username, email, password, dob, country },
    profilePic
  ) => {
    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("dob", dob);
    formData.append("country", country);
    formData.append("profilePic", profilePic);

    const response = await fetch(`${url}/register`, {
      method: "POST", // Request method
      body: formData,
    });

    const data = await response.json();

    if (!data) {
      console.log("Something went wrong while fetching data in userState.");
    }

    return data;
  };

  const loginUser = async ({ username, email, password }) => {
    const response = await fetch(`${url}/login`, {
      method: "POST", // Request method
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();
    if (!data) {
      console.log("something went wrong while log in");
    }

    return data;
  };

  const logoutUser = async () => {
    const response = await fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    });

    const data = await response.json();

    return data;
  };

  const getUserProfile = async (id) => {
    const response = await fetch(`${url}/getuser/${id}`, {
      method: "GET",
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    });

    const data = await response.json();
    return data;
  };

  const changeProfileToNewImage = async (profileImage) => {
    const newformData = new FormData();
    newformData.append("profilePic", profileImage);

    const response = await fetch(`${url}/updateprofileimage`, {
      method: "PATCH",
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
      body: newformData,
    });

    const data = await response.json();

    return data;
  };

  const changeUserPassword = async (
    { oldpassword,
    newpassword,
    confirmPassword }
  ) => {
    const response = await fetch(`${url}/changepassword`, {
      method: "PATCH", // Request method
      headers: {
        "Content-type": "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        oldPassword: oldpassword,
        newPassword: newpassword,
        confirmPassword: confirmPassword,
      }),
    });

    const data = await response.json();
    return data
  };

  return (
    <userContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        getUserProfile,
        changeProfileToNewImage,
        changeUserPassword,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
