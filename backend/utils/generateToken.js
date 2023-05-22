import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  //create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  //create cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', //site has to be https; true if the site is in production
    sameSite: 'strict', //prevent csrf attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, //expiration of cookie in milliseconds
  });
};

export default generateToken;
