const express = require("express");
const blogsService = require("../services/blogsService");
const router = express.Router();
const upload = require("../multer");
const backendUrl = process.env.VITE_API_URL || 'http://localhost:3000';

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
router.post("/image-upload", upload.single('image'), blogsService.imageUpload);
router.delete("/delete-image", blogsService.deleteImage);
router.delete("/delete-blog/:id", checkAuth, blogsService.deleteBlog);

router.get('/blogs-feed', checkAuth, blogsService.getAllBlogsFeed);

module.exports= router;