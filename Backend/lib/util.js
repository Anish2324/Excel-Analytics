import jwt from "jsonwebtoken";

export const generatetoken = (adminId, res) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    // set to false if testing locally
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: false,
  });

  return token;
};