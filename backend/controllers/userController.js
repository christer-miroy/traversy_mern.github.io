import asyncHandler from 'express-async-handler'; //use async-await without try-catch
import generateToken from '../utils/generateToken.js'; //generate token
import User from '../models/userModel.js'; //user model

// @desc    Auth user/set token
// route    POST/api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // password will be checked in User model
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Email or Password');
  }
});

// @desc    Register new user
// route    POST/api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  //get data from the body
  const { name, email, password } = req.body;

  //check if the user exists by checking the email
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// @desc    logout user
// route    POST/api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  //destroy cookie
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// @desc    Get user profile
// route    GET/api/users/profile
// @access  Private (need valid JWT)
const getUserProfile = asyncHandler(async (req, res) => {
  //protect data
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// @desc    Update user profile
// route    PUT/api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    //update password is optional
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
