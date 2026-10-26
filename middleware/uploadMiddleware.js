const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path");
const fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    
    let uploadPath = "./public/images/uploads"; // Default folder

    if (file.fieldname === "profileImage") {
      uploadPath = "./public/images/profiles";
    } else if (file.fieldname === "postImage") {
      uploadPath = "./public/images/posts";
    }
    else if (req.body && req.body.folder) {
      uploadPath = `./public/images/${req.body.folder}`;
    }

    // check whether a folder have or not if not then auto create it
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const unique = uuidv4();
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});

module.exports = upload