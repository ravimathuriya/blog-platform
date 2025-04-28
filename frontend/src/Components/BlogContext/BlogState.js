import blogContext from "./BlogContext";

const blogUrl = "https://blog-platform-backend-9q8x.onrender.com/api/v1/blogs";

const BlogState = (props) => {
  const addNewBlog = async ({ title, description, username }, blogPic) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("username", username);
    formData.append("blogPic", blogPic);

    const response = await fetch(`${blogUrl}/addblog`, {
      method: "POST",
      headers:{
        "accessToken":localStorage.getItem("accessToken")
      },
      credentials: "include",
      body: formData,
    });

    const data = await response.json();
    return data;
  };

  const getAllBlogs = async() =>{

    const response = await fetch(`${blogUrl}/getallblogs`,{
        method:"GET",
        headers:{
            "accessToken":localStorage.getItem("accessToken")
        },
      credentials: "include",
    });

    const data = await response.json()
    return (data)

  }

  const deleteBlog = async(id) =>{
    const response = await fetch(`${blogUrl}/deleteblog/${id}`, {
        method:"DELETE",
        headers:{
            "accessToken":localStorage.getItem("accessToken")
        },
      credentials: "include"
    });
    const data = response.json()
    return (data)
  }

  const editBlog = async (id, {newTitle, newDescription}, editedImage) =>{

    const formData = new FormData();

    formData.append("title", newTitle)
    formData.append("description", newDescription)
    formData.append("blogPic", editedImage)

    const response = await fetch(`${blogUrl}/updateblog/${id}`, {
      method:"PATCH",
      headers:{
          "accessToken":localStorage.getItem("accessToken")
      },
      credentials: "include",
      body:formData
  });

  const data = await response.json()
  return (data)

  }

  return (
    <blogContext.Provider value={{addNewBlog, getAllBlogs, deleteBlog, editBlog}}>
      {props.children}
    </blogContext.Provider>
  );
};

export default BlogState;
