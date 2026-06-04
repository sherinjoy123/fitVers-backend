import jwt from "jsonwebtoken"

const protect = (req, res, next) => {

  try {
    console.log("AUTH HEADER:", req.headers.authorization)
console.log("DECODED USER:", req.user)
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json("No token")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded   // { id }

    next()

  } catch (err) {
    res.status(401).json("Token invalid")
  }
}

export default protect