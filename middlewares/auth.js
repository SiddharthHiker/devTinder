// Handle Auth Middleware fort all GET POST, ....request
const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting Checked!!");
    const token = "sid";
    const isAdminAuthorized = token === "sid";
    if (!isAdminAuthorized) {
      res.status(401).send("unauthorized request");
    } else {
      next();
    }
  };


  const userAuth = (req, res, next) => {
    console.log("user auth is getting Checked!!");
    const token = "sid";
    const isUserAuthorized = token === "sid";
    if (!isUserAuthorized) {
      res.status(401).send("unauthorized request");
    } else {
      next();
    }
  };

  module.exports = {
      adminAuth,
      userAuth,
  };