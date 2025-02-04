require('dotenv').config();

const ImageKit = require("imagekit");

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });


exports.imageUpload = async(req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
    
        const file = req.file;
        const fileName = `image_${Date.now()}`;
    
        const result = await imagekit.upload({
          file: file.buffer, // File buffer from Multer
          fileName,
        });
    
        res.json({
          success: true,
          imageUrl: result.url,
          fileId: result.fileId, // Store this for deletion
        });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
}

exports.imageDelete = async (req, res) => {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({ success: false, message: "Missing file ID" });
    }

    await imagekit.deleteFile(fileId);

    return res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Image Deletion Error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete image" });
  }
};
