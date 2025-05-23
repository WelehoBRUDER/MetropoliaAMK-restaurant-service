import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user.token = token;
    next();
  } catch (err) {
    res.status(403).send({message: "Invalid token"});
  }
};

export default requireAuth;
