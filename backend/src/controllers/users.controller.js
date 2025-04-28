import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  const existUser = await User.findById(userId);

  const accessToken = await existUser.generateAccessToken();
  const refreshToken = await existUser.generateRefreshToken();

  existUser.accessToken = accessToken;
  existUser.refreshToken = refreshToken;
  existUser.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  //take data from req.body
  const { fullName, username, email, password, dob, country, profilePic } =
    req.body;

  //check if any empty
  if (
    [fullName, username, email, password, dob, country].some(
      (detail) => detail.trim() == ""
    )
  ) {
    res.status(400).json({
      message: "All fields are required.",
    });
  }
  //check if user already exist

  const exitUser = await User.findOne({
    $or: [{ email, username }],
  });

  if (exitUser) {
    res.status(400).json({
      message: "User already exist",
    });
  }

  //check the file path
  const filePath = req.files?.profilePic?.[0]?.path;

  if (!filePath) {
    res.status(400).json({
      message: "Profile pic is required to upload ",
    });
  }

  //upload file on cloudinary
  const profileImage = await uploadOnCloudinary(filePath);

  if (!profileImage) {
    res.status(400).json({
      message: "Issue while uploading image on cloudinary",
    });
  }

  //create the User on database

  const createUser = await User.create({
    username: username.toLowerCase(),
    fullName: fullName,
    email: email,
    password: password,
    dob: dob,
    country: country,
    profilePic: profileImage.url,
  });

  //if user not created in database
  if (!createUser) {
    res.status(400).json({
      message: "Issue while creating the user on database",
    });
  }


  return res.status(200).json({
    message: "User registered successfully",
    createUser,
  });
});

const logInUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(email || username)) {
    res.status(400).json({
      message: "username or email is required",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!existingUser) {
    res.status(500).json({
      message: "User not registered",
    });
  }

  const comparePassword = await existingUser.isPasswordCorrect(password);

  if (!comparePassword) {
    res.status(500).json({
      message: "Please check your password",
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existingUser._id
  );

  const loggedUser = await User.findById(existingUser._id).select(
    "-password -accessToken -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User loggedin successfully",
      loggedUser,
      accessToken,
      refreshToken,
    });
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        accessToken: 1,
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User logged out successfully",
    });
});

const changePassword = asyncHandler(async(req, res)=>{
  const {oldPassword, newPassword, confirmPassword} = req.body

  if(newPassword !== confirmPassword){
    res.status(500).json({
      message:"New Password and confirm Password are different"
    })
  }

  if(oldPassword == newPassword){
    res.status(500).json({
      message:"New Password should not be same as old password "
    })
  }

  const findUser = await User.findById(req.user._id)

  if(!findUser){
    res.status(500).json({
      message:"Unauthorized request from User"
    })
  }

  const comparePassword = await findUser.isPasswordCorrect(oldPassword)

  if(!comparePassword){
    res.status(500).json({
      message:"Please check the old password"
    })
    console.log(comparePassword)
  }

  findUser.password = newPassword
  await findUser.save({validateBeforeSave:false})

  return res.status(200).json({
    message:"Password updated successfully",
    newPassword
  })

})

const changeProfileImage = asyncHandler(async(req, res)=>{
  const profileImage = req.file.path

  if(!profileImage){
    res.status(500).json({
      message:"Profile image required"
    })
  }

  const newImage = await uploadOnCloudinary(profileImage)

  if(!newImage){
    res.status(400).json({
      message:"Issue while uploading the image"
    })
  }

  const updateImage = await User.findByIdAndUpdate(
    req.user._id,
    {$set:{
      profilePic:newImage.url
    }},
    {new:true}
  )

  if(!updateImage){
    res.status(400).json({
      message:"issue while updating the image to user database"
    })
  }

  return res.status(200).json({
    message:"Profile image updated successfully",
    updateImage
  })

})

const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      message: "UserID required for profile details",
    });
  }

  const userDetails = await User.findById(userId);

  if (!userDetails) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "User details fetched successfully",
    userDetails,
  });
});

export { registerUser, logInUser, logOutUser, changePassword, changeProfileImage, getUserProfile };
