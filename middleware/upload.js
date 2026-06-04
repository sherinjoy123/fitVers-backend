import multer from "multer"

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },

  filename: (req, file, cb) => {

    const uniqueName = Date.now()

    const ext = file.originalname
      ? file.originalname.split(".").pop()
      : "jpg"

    cb(null, uniqueName + "." + ext)

  }

})

const upload = multer({ storage })

export default upload