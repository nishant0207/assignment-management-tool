// Middleware to authenticate the user using JWT token

const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to the request
    next();
  } catch (err) {
    console.error("Invalid Token:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

exports.authorize = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ msg: "Access denied: Insufficient permissions" });
  }
  next();
};

// Middleware to check user roles for role-based access control
exports.authorize = (roles) => {
  return (req, res, next) => {
    // Ensure user exists in the request (after authentication middleware)
    if (!req.user) {
      console.log("Access denied: User not authenticated");
      return res.status(401).json({ msg: "Authorization required" });
    }

    // Check if the user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      console.log(
        `Access denied: User role '${req.user.role}' is not authorized for this resource`
      );
      return res
        .status(403)
        .json({ msg: "Access denied: Insufficient permissions" });
    }

    console.log(`Access granted: User role '${req.user.role}'`);
    next();
  };
};