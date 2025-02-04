const blogsService = require("../services/blogsService");
const mediaService = require('../services/mediaService')
const express = require("express");
const router = express.Router();

const multer = require("multer");
// Configure Multer (for handling file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.use((req, res, next) => {
    console.log("Auth debug:", req.auth); // Should show Clerk session and user data
    next();
  });

const checkAuth = (req, res, next) => {
    console.log("checking if session exists");

    if(!req.auth || !req.auth.sessionId){
        return next(new Error("Unauthenticated"));
    }

    next();
}

router.get("/get-all-blogs", checkAuth, blogsService.getAllBlogs);
router.post("/add-blog-story", checkAuth, blogsService.addBlogStory);
router.put("/edit-blog-story/:id", checkAuth, blogsService.editBlogStory);
router.put("/update-is-favourite/:id", checkAuth, blogsService.updateFavourite);
router.put("/update-view-count/:id", blogsService.updateViewCount);
router.put("/update-like-count/:id", blogsService.updateLikeCount);
router.delete("/delete-blog/:blogId", checkAuth, blogsService.deleteBlog);

router.post("/image-upload", upload.single('image'), mediaService.imageUpload);
router.delete("/delete-image/:fileId", mediaService.imageDelete);


router.get('/blogs-feed', checkAuth, blogsService.getAllBlogsFeed);

module.exports= router;