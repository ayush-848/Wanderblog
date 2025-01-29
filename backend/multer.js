const multer= require("multer");
const path= require("path");

// Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/'); // Directory where files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
  });
  
  // Multer middleware
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif/; // Allowed file types
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
  
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed!'));
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  });


module.exports= upload;