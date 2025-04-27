import React, { useContext, useEffect, useRef, useState } from "react";
import "./Css/Card.css";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import blogContext from "./BlogContext/BlogContext";
import userContext from "./UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import EditBlogModal from "./EditBlogModal";


function Card(props) {

const [blogs, setBlogs] = useState([]);
const [username, setUsername] = useState("")
const defaultPic = "https://picsum.photos/1000/1000";
const {notify, updateToast} = props;
const navigate = useNavigate()
const ref = useRef()

const {getAllBlogs, deleteBlog} = useContext(blogContext)
const {getUserProfile} = useContext(userContext)

const allBlogs = async() =>{
  const allBlogs = await getAllBlogs()

  if(!allBlogs){
    notify("Somthing went wrong while fetching the data", "warning")
  }

  else{
    const allData = await allBlogs.findBlog;
    setBlogs(allData)
  }
}

const handleBloggerID = async (id) =>{
  const user = await getUserProfile(id)
  const userDetails = await user.userDetails
  setUsername(userDetails.fullName)
}

const handleBlogDelete = async(id) =>{
  notify("In progress. Please wait...", "warning")
  const removeBlog = await deleteBlog(id)

  if(!removeBlog){
    updateToast("Blog not found", "error");
  }

  else if(removeBlog.message === "Blog deleted successfully"){
    updateToast("Blog deleted successfully", "success");
    allBlogs()
  }
}

const handleOpenEditBlog = () =>{
  ref.current.click()
}

useEffect(()=>{
  if(!localStorage.getItem("accessToken")){
    navigate("/login", {replace:true})
  }
  else{
    allBlogs()
    handleBloggerID()
  }  
  // eslint-disable-next-line
},[])

  return (
    <>
          { !blogs ?
            <h1>Something went wrong for fetching the blogs</h1>
          : blogs.map((blog)=> 

            {
              return (
              <article className="postcard light blue" key={blog._id} >
              <img
                className="postcard__img"
                src= {blog.blogPic|| defaultPic} 
                alt=""
              />
            
            <div className="postcard__text t-dark">
              <h1 className="postcard__title blue">
                <div> {blog.title} </div>
              </h1>
              <div className="postcard__subtitle small">
                <time dateTime={(new Date(blog.createdAt).toString()).slice(0,16)}>
                  <i className="fas fa-calendar-alt mr-2"></i>{(new Date(blog.createdAt).toString()).slice(0,16)},
                </time>
                <div onFocus = {handleBloggerID(blog.postedBy)} > Created By: {username} </div>
              </div>
              <div className="postcard__bar"></div>
              <div className="postcard__preview-txt">
                {blog.description}
              </div>
              <ul className="postcard__tagbox">
                <li className="tag__item play blue">
                    <span onClick={()=>handleBlogDelete(blog._id)} >
                    <MdDelete className="fas fa-play mr-2" />Delete
                  </span>
                </li>
                <li className="tag__item play blue">
                    <span onClick={handleOpenEditBlog}>
                    <BiEdit className="fas fa-play mr-2" />Edit
                  </span>
                </li>
              </ul>
            </div>
            <EditBlogModal ref ={ref} id = {blog._id} title = {blog.title} description = {blog.description} allBlogs = {allBlogs} updateToast={updateToast} notify={notify} />
          </article>
            )
          })
        }

        
    </>
  );
}

export default Card;
