import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addBlog = asyncHandler(async (req, res) => {
  const { title, description, username } = req.body;

  if (!(title && description && username)) {
    res.status(500).json({
      message: "All fields are required",
    });
  }

  const findUser = await User.findOne({ username });

  if (!findUser) {
    res.status(500).json({
      message: "Please check the username",
    });
  }

  const blogPicPath = req.files.blogPic[0].path;

  if (!blogPicPath) {
    res.status(500).json({
      message: "blog pic required",
    });
  }

  const blogImage = await uploadOnCloudinary(blogPicPath);

  if (!blogImage) {
    res.status(400).json({
      message: "Issue while uploading image on cloudinary",
    });
  }

  const blogImageURL = await blogImage.url

  const secureBlogImageURL = await blogImageURL.replace("http://", "https://") 

  const userDetails = await User.aggregate([
    {
      $match: {
        username: username,
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "_id",
        foreignField: "postedBy",
        as: "postedBy",
      },
    },
    // {
    //     $project:{
    //         _id:1,
    //     }
    // }
  ]);

  const newBlog = await Blog.create({
    title: title,
    description: description,
    blogPic: secureBlogImageURL,
    postedBy: userDetails,
  });

  if (!newBlog) {
    res.status(400).json({
      message: "issue while blog creation",
    });
  }

  return res.status(200).json({
    message: "Blog created successfully",
    newBlog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).json({
      message: "ID required for delete the blog",
    });
  }

  const removeBlog = await Blog.findByIdAndDelete(id);

  if (!removeBlog) {
    res.status(500).json({
      message: "blog not found",
    });
  }

  return res.status(200).json({
    message: "Blog deleted successfully",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  const { title, description } = req.body;

  if (!(title && description)) {
    res.status(400).json({
      message: "All fields are required",
    });
  }

  let updateFields = {
    title: title,
    description: description,
  };

  const blogPath = req.file?.path;

  if (blogPath) {
    const uploadBlogImage = await uploadOnCloudinary(blogPath);

    if (!uploadBlogImage) {
      res.status(400).json({
        message: "Image requried for upload",
      });
    }

    const updatedblogImageURL = await uploadBlogImage.url

  const secureUpdatedBlogImageURL = await updatedblogImageURL.replace("http://", "https://")
    
    // If image uploaded successfully, include it in the update fields
    updateFields.blogPic = secureUpdatedBlogImageURL;
   
  }

  const updateBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $set: updateFields,
    },
    { new: true }
  );

  if (!updateBlog) {
    res.status(400).json({
      message: "issue while updating the blog",
    });
  }

  return res.status(200).json({
    message: "Blog updated sucessfully",
    updateBlog,
  });
});

const fetchAllblog = asyncHandler(async (req, res) => {
  const findBlog = await Blog.find({});

  if (!findBlog) {
    res.status(400).json({
      message: "Issue while fetching the blogs",
    });
  }

  return res.status(200).json({
    message: "All blogs fetched successfully",
    findBlog,
  });
});

export { addBlog, deleteBlog, updateBlog, fetchAllblog };
