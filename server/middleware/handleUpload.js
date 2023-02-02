const multer = require("multer");

const handleUpload = async (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });

  const upload = multer({ storage });
  const uploadMiddleware = upload.single("file");
  uploadMiddleware(req, res, next);
};

module.exports = handleUpload;
