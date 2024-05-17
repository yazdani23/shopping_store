const multer = require("multer");
const path = require("path");

// create storage and make folder to upload image there
const uploadMulter = (folderName) => {
  const storage = multer.diskStorage({
    destination: path.join(__dirname, `../../public/images/${folderName}`),

    filename: (req, file, cb) => {
      console.log(file);
      const fileName = file.originalname.toLowerCase().split(" ").join("-");
      cb(null, Date.now() + "-" + fileName);
    },
  });
  return multer({ storage: storage }).single("image");

};

 
module.exports = uploadMulter;
