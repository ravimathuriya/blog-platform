import React, { useState, useEffect, useContext } from 'react'
import "./Css/AddBlog.css"
import blogContext from './BlogContext/BlogContext';

function AddBlog(props) {

  const {user, notify, updateToast} = props;

  const {addNewBlog} = useContext(blogContext)

  const username = user ? user.username : "Guest";

  const [blog, setBlog] = useState({
    title:"",
    description:"",
    username: username
  })

  const [blogPic, setBlogPic] = useState(null)

  useEffect(() => {
    if (user && user.username) {
      setBlog((prevBlog) => ({
        ...prevBlog,
        username: user.username,
      }));
    }
  }, [user]);

  const onChange = (e) =>{
    setBlog({...blog, [e.target.name]:e.target.value})
    if (e.target.type === "file") {
      // Handle file input separately
      const file = e.target.files[0];
      setBlogPic(file);
  }
  }

  const handleBlog = async(e) =>{
    e.preventDefault();
    notify("In progress. Please wait...", "warning");
    const newBlog = await addNewBlog(blog, blogPic);

    if(newBlog.message === "All fields are required"){
      updateToast("All fields are required", "warning");
    }

    else if(newBlog.message === "blog pic required"){
      updateToast("Blog pic required", "error");
    }

    else if(newBlog.message === "Issue while uploading image on cloudinary"){
      updateToast("Issue while uploading image on cloudinary", "error");
    }

    else if(newBlog.message === "issue while blog creation"){
      updateToast("Issue while blog creation", "error");
    }

    else{
      updateToast("Blog created successfully", "success");
    }

  }

  

  return (
    <>
      <form className="container my-5">
        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Title
          </label>
          <input
            type="title"
            name='title'
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="titleHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputDescription" className="form-label">
            Description
          </label>
          <input
            type="description"
            name='description'
            className="form-control"
            id="exampleInputDescription"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label">
            Username
          </label>
          <input
            type="username"
            name='username'
            className="form-control"
            id="exampleInputUsername"
            value={user.username}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Upload the Blog Pic
          </label>
          <input className="form-control" type="file" id="formFile" accept='image/*' onChange = {onChange}  />
        </div>
        <button type="submit" className="btn my-3" onClick={handleBlog} >
          Submit
        </button>
      </form>
    </>
  )
}

export default AddBlog

