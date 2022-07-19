const jwt = require("jsonwebtoken");


const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.body.token

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log(13)
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    console.log("sdfsdfds")
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;