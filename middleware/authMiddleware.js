import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);

    req.user = decoded; // { id: ... }

    console.log("REQ USER AFTER SET:", req.user);

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default protect;