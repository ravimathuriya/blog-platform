import React, { useContext, useRef, useState } from "react";
import blogContext from "./BlogContext/BlogContext";

function EditBlogModal(props) {
  const { ref, id, title, description, allBlogs, notify, updateToast } = props;
  const {editBlog} = useContext(blogContext)

  const modalRef = useRef(null); // Ref to access the modal element
  const closeButtonRef = useRef(null); // Ref to access the modal's close button

  const [existedBlog, setExistedBlog] = useState({
    newTitle:title,
    newDescription:description
  }) 

  const [editedImage, setEditedImage] = useState(null)

  const handleCloseModal = () => {
    // Trigger the click event on the close button
    if (closeButtonRef.current) {
      closeButtonRef.current.click(); // Close the modal by triggering the close button click
    }
  };

  const handleEditBlog = (e) =>{
    setExistedBlog({...existedBlog, [e.target.name]: e.target.value })
    if(e.target.type === "file"){
      const newImage = e.target.files[0];
      setEditedImage(newImage)
    }
  }

  const updateTheBlog = async() =>{
    notify("In progress. Please wait...", "warning")
    const updatedBlog = await editBlog(id, existedBlog, editedImage)


    if(updatedBlog.message === "All fields are required"){
      updateToast("All fields are required", "warning");
    }

    else if(updatedBlog.message === "Image requried for upload"){
      updateToast("Image requried for upload", "warning");
    }

    else if(updatedBlog.message === "issue while updating the blog"){
      updateToast("Issue while updating the blog", "error");
    }

    else if(updatedBlog.message === "Blog updated sucessfully" ){
      allBlogs()
      updateToast("Blog updated successfully", "success");
      setTimeout(() => {
        handleCloseModal()
      }, 500);
    }

    else{
      updateToast("Something went wrong while updating the blog", "error");
    }

  }


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
        ref={modalRef}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" style={{color:"black"}}>
                Update Blog
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={closeButtonRef}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <div className="d-flex pb-3" style={{flexDirection:"column"}} >
              <label htmlFor="exampleFormControlFile1" style={{color:"black"}}>
                  {" "}
                  Title
                </label>
                <input
                  type="text"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  name="newTitle"
                  value={existedBlog.newTitle}
                  onChange={handleEditBlog}
                />
                </div >
                <div className="d-flex pb-3" style={{flexDirection:"column"}}>
                <label htmlFor="exampleFormControlFile1" style={{color:"black"}}>
                  {" "}
                  Description
                </label>
                <input
                  type="text"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  name="newDescription"
                  value={existedBlog.newDescription}
                  onChange={handleEditBlog}
                />
                </div>
                <div className="d-flex" style={{flexDirection:"column"}}>
                <label htmlFor="exampleFormControlFile1" style={{color:"black"}}>
                  {" "}
                  Choose your file to upload
                </label>
                <input
                  type="file"
                  className="form-control-file"
                  id="exampleFormControlFile1"
                  accept="image/*"
                  onChange={handleEditBlog}
                />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={updateTheBlog}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBlogModal;
