const fs = require("fs/promises");
const path = require("path");
const Blogs = require("../models/Blogs"); // Adjust import based on your setup
const backendUrl = process.env.VITE_API_URL || "http://localhost:3000";

// Get all blogs for the authenticated user
exports.getAllBlogs = async (req, res) => {
    const { userId } = req.auth;

    try {
        const blogStories = await Blogs.find({ userId }).sort({ views: -1 });
        res.status(200).json({ blogs: blogStories });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

//get all blogs of all users for main feed
exports.getAllBlogsFeed = async (req, res) => {
    try {
        const blogs = await Blogs.find().sort({ views: -1 });
        res.status(200).json({ blogs: blogs });
    }
    catch (error) {
        console.error('Error fetching blogs: ', error);
        res.status(500).json({message: 'Failed to fetch blogs', error: error.message})
    }
}

// Add a new blog story
exports.addBlogStory = async (req, res) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.auth;


    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }


    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try {
        const blogStory = new Blogs({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate,
        });

        await blogStory.save();
        res.status(201).json({ story: blogStory, message: "Added Successfully" });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
};

// Edit an existing blog story
exports.editBlogStory = async (req, res) => {
    const { id } = req.params;
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.auth;

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try {
        const blogStory = await Blogs.findOne({ _id: id, userId });

        if (!blogStory) {
            return res.status(400).json({ error: true, message: "Blog not found" });
        }

        blogStory.title = title;
        blogStory.story = story;
        blogStory.visitedLocation = visitedLocation;
        blogStory.imageUrl = imageUrl;
        blogStory.visitedDate = parsedVisitedDate;

        await blogStory.save();
        res.status(200).json({ story: blogStory, message: "Update Successful" });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

// Update blog as favorite
exports.updateFavourite = async (req, res) => {
    const { id } = req.params;
    const { isFavourite } = req.body;
    const { userId } = req.auth;

    try {
        const blogStory = await Blogs.findOne({ _id: id, userId });

        if (!blogStory) {
            return res.status(404).json({ error: true, message: "Blog not found" });
        }

        blogStory.isFavourite = isFavourite;
        await blogStory.save();

        res.status(200).json({ story: blogStory, message: "Favourite status updated successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

// Update view count
exports.updateViewCount = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blogs.findById(id);

        if (!blog) {
            return res.status(404).json({ error: true, message: "Blog not found" });
        }

        blog.views += 1;
        await blog.save();

        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

// Update like count
exports.updateLikeCount = async (req, res) => {
    const { id } = req.params;
    const { increase } = req.body;

    try {
        const blog = await Blogs.findById(id);

        if (!blog) {
            return res.status(404).json({ error: true, message: "Blog not found" });
        }

        blog.likes = increase ? blog.likes + 1 : Math.max(blog.likes - 1, 0);
        await blog.save();

        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

exports.imageUpload = async (req, res) => {
    try {
        let imageUrl;

        // Check if an image is uploaded
        if (req.file) {
            // If image is uploaded, set the image URL to the uploaded file's path
            imageUrl = `${backendUrl}/uploads/${req.file.filename}`;
        } else {
            // If no image uploaded, use a default placeholder image URL
            imageUrl = `${backendUrl}/uploads/placeholder.png`;
        }

        // Respond with the image URL
        res.status(201).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}

exports.deleteImage = async (req, res) => {
    const { imageUrl } = req.query;

    if (!imageUrl) {
        return res.status(400).json({ error: true, message: "imageUrl parameter is required" });
    }

    try {
        // Extract the filename from the imageUrl
        const filename = path.basename(imageUrl);

        // Define the file path
        const filePath = path.join(__dirname, 'uploads', filename);

        // Check if file exists
        if (fs.existsSync(filePath)) {
            // Delete the file from the uploads folder
            fs.unlinkSync(filePath);
            res.status(200).json({ message: "Image deleted successfully " });
        } else {
            res.status(200).json({ error: true, message: "Image not found" });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}

exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.auth;

    try {
        const blog = await Blogs.findById(id);

        if (!blog) {
            return res.status(404).json({ error: true, message: "Blog not found" });
        }

        if (blog.userId.toString() !== userId) {
            return res.status(403).json({ error: true, message: "You are not authorized to delete this story" });
        }

        await Blogs.findByIdAndDelete(id);

        res.status(200).json({ message: "Story deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting the story:", error);
        res.status(500).json({ error: true, message: "An error occurred while deleting the story" });
    }
}