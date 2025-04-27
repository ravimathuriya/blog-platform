import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import UserState from "./Components/UserContext/UserState";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ProfileViewer from "./Components/ProfileViewer";
import ChangePassword from "./Components/ChangePassword";
import AddBlog from "./Components/AddBlog";
import BlogState from "./Components/BlogContext/BlogState";



function App() {
  const toastId = useRef(null);
  const [user, setUser] = useState("")

  const notify = (message, role) => {
    toastId.current = toast(message, { type: role, autoClose: false });
  };

  const updateToast = (message, role) => {
    toast.update(toastId.current, {
      render: message,
      type: role,
      autoClose: 2000,
    });
  };

  const dismisToast = () =>{
    toast.dismiss();
  }

  const getUserInfo = (userDetails) =>{
    setUser(userDetails)
  } 

  useEffect(()=>{
    if(window.onclose){
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userID")
    }
  })
  

  return (
    <>
      <UserState>
        <BlogState>
        <BrowserRouter>
          <Navbar notify={notify} updateToast={updateToast} dismisToast= {dismisToast} getUserInfo={getUserInfo} />
          <ToastContainer position="top-left" theme="light" autoClose={2000} limit={1} />
          <Routes>
            <Route exact path="/" element={<Home notify={notify} updateToast={updateToast} />} />
            <Route
              exact
              path="/signup"
              element={<Signup notify={notify} updateToast={updateToast} />}
            />
            <Route exact path="/login" element={<Login notify={notify} updateToast={updateToast} />} />
            <Route exact path="/profile" element={<ProfileViewer user={user} notify={notify} updateToast={updateToast} dismisToast= {dismisToast} />} />
            <Route exact path="/changepassword" element={<ChangePassword notify={notify} updateToast={updateToast} />} />
            <Route exact path="/addblog" element={<AddBlog user={user} notify={notify} updateToast={updateToast} />} />
          </Routes>
        </BrowserRouter>
        </BlogState>
      </UserState>
    </>
  );
}

export default App;
