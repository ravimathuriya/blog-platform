import React, { useContext, useEffect, useState } from "react";
import userContext from "./UserContext/UserContext";

function ChangeImageModal(props) {
  const { ref, notify, updateToast, dismisToast } = props;
  const { changeProfileToNewImage } = useContext(userContext);

  const [newProfilePic, setNewProfilePic] = useState(null);

  const onChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setNewProfilePic(file);
    }
  };

  const changeProfileImage = async () => {
    notify("In progress. Please wait...", "warning");
    if (!newProfilePic) {
      updateToast("Please select the image to upload", "warning");
    } else {
      const updatedImage = await changeProfileToNewImage(newProfilePic);
      if (!updatedImage) {
        updateToast("Issue while uploading the image", "error");
      } else {
        updateToast("Profile pic updated successfully", "success");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
      }
      dismisToast();
    }
  };

  useEffect(()=>{
    
  })

  return (
    <>
      <button
        type="button"
        style={{ display: "none" }}
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change profile image
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="pb-2" htmlFor="exampleFormControlFile1">
                  {" "}
                  <span style={{ color: "red" }}>*</span> Choose your file to
                  upload
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  accept="image/*"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={changeProfileImage}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeImageModal;
