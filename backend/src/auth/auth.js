import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  console.log(res.headers);
  const token = res.headers.get("Authorization");
  console.log("token", token);
  if (!token) {
    return res.send("");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.send(err);
  }
};

export default requireAuth;
