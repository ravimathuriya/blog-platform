import React, { useRef } from "react";
import "./Css/ProfileViewer.css";
import ChangeImageModal from "./ChangeImageModal";
import { Link } from "react-router-dom";



function ProfileViewer(props) {
  const { user, notify, updateToast, dismisToast, fetchedUser } = props;
  const ref = useRef()

  const handleChangeImage = () =>{
    ref.current.click()
  }

  return (
    <>
      <div className="page-content page-container" id="page-content">
        <div
          className="padding d-flex justify-content-center"
          style={{ alignItems: "center" }}
        >
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-12 col-md-12">
              <div
                className="card user-card-full"
                style={{ minHeight: "600px" }}
              >
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-12 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-5">
                        <img
                          className="img-radius"
                          alt="User-Profile-Image"
                          //   src="https://img.icons8.com/bubbles/100/000000/user.png"
                          src={user.profilePic}
                        />
                      </div>
                      <div className="f-w-600">
                        <p style={{color:"white", cursor:"pointer", textDecoration:"underline"}} onClick={handleChangeImage} >change Image</p></div>
                      <h6 className="f-w-600 my-3">{user.fullName}</h6>
                      <p>{user.username}</p>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">{user.email}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Date of Birth</p>
                          <h6 className="text-muted f-w-400">{user.dob}</h6>
                        </div>
                        <div className="row m-b-20 p-b-5 b-b-default f-w-600 mt-2">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Country</p>
                            <h6 className="text-muted f-w-400">
                              {user.country}
                            </h6>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  
                <button type="submit" className="btn my-3" style={{width:"fit-content", textAlign:"center"}} >
           <Link to="/changepassword" >Change Password</Link> 
        </button>
        </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangeImageModal ref={ref} notify={notify} updateToast={updateToast} dismisToast= {dismisToast} fetchedUser={fetchedUser} />
    </>
  );
}

export default ProfileViewer;
