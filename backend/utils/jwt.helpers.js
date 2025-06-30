import jwt from "jsonwebtoken";

const jwtTokens = ({ user_id, user_name, user_email }) => {
  const user = { user_id, user_name, user_email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "200m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "300m",
  });
  return { accessToken, refreshToken };
};

export { jwtTokens };
