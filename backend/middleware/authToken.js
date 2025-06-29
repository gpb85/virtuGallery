import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.json({ message: err.message });
  }
};

export default authToken;
