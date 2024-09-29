let userModel=require("../model/user");
const jwt = require("jsonwebtoken");
          
// Middleware for handling auth
async function my_auth(req, res, next) {
  // Implement user auth logic
  try {
    if (req.cookies.emtoken != undefined && req.cookies.emtoken != "") {
      const token = req.cookies.emtoken;
      
      const data = jwt.verify(token, "aabb");
      let user = await userModel.findOne({ email: data.tokemail })
        
      if (!user) return res.status(403).json({ msg: "User not found" });
      else{
      req.user = user;
      next();
      }
    } else {
      res.redirect("/login");
      console.log("Please Login First");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
}

module.exports = my_auth;
