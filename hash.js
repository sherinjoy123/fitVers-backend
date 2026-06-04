import bcrypt from "bcryptjs"

const hashPassword = async () => {
  const password = await bcrypt.hash("admin123", 10)
  console.log(password)
}

hashPassword()