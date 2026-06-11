import jwt from "jsonwebtoken";

const protectAny = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = decoded;

    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default protectAny;
