const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const userRoutes = require('./routes/userRoutes.js');
const path = require('path');
const upload = require("./multer")
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB().then(() => {
  console.log('MongoDB connected successfully.');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
});

// Configure CORS
const allowedOrigins = [
  'https://www.wanderblog.xyz',
  'https://wanderblog-ayush-debs-projects.vercel.app',
  'http://localhost:3000',    // Ensure localhost is included
  process.env.FRONT_END_URL
];



app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

//Blogs part
const Blogs = require("./models/Blogs.js");
const auth = require("./middlewares/auth.js")

// Middleware
app.use(express.json());

// API Routes
app.use('/users', userRoutes);

//get all blogs
app.get("/get-all-blogs", auth, async (req, res) => {
  const { userId } = req.user;

  try {
    const blogStories = await Blogs.find({ userId: userId })
      .sort({ views: -1 });

    res.status(200).json({ blogs: blogStories });

  }
  catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
})

//add blog story
app.post("/add-blog-story", auth, async (req, res) => {
  const { title, story, visitedLocation, imageUrl,
    visitedDate, views, likes
  } = req.body;

  const { userId } = req.user;

  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  //convert visitedDate from millisec to date object
  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try {
    const blogStory = new Blogs({
      title,
      story,
      visitedLocation,
      userId,
      imageUrl,
      visitedDate: parsedVisitedDate,
      views, likes,
    });

    await blogStory.save();
    res.status(201).json({ story: blogStory, message: "Added Successfully" });
  }
  catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
});

app.put("/edit-blog-story/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;

  const { userId } = req.user;

  if (!title || !story || !visitedLocation || !imageUrl || !visitedDate || !views || !likes) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  const parsedVisitedDate = new Date(parseInt(visitedDate));

  try {
    const blogStory = await Blogs.findOne({ _id: id, userId: userId });

    if(!blogStory){
      return res.status(400).json({ error: true, message: "Blog not found"});
    }

    blogStory.title = title;
    blogStory.story = story;
    blogStory.visitedLocation = visitedLocation;
    blogStory.imageUrl = imageUrl;
    blogStory.visitedDate = parsedVisitedDate;

    await blogStory.save();
    res.status(200).json({ story: blogStory , message: "Update Successful"});
  }
  catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

const backendUrl = process.env.VITE_API_URL || 'http://localhost:3000';

app.post("/image-upload", upload.single("image"), async(req, res) => {
  try {
    let imageUrl;

    //check if image is uploaded
    if(req.file) {
      //if image is uploaded, set image url to uploaded file's path
      imageUrl= `${backendUrl}/uploads/${req.file.filename}`
    }
    else {
      // if no image is uploaded, set a default image
      imageUrl= `${backendUrl}/uploads/placeholder.png`
    }

    //respond with image url
    res.status(201).json({ imageUrl });
  }
  catch(error){
    res.status(500).json({ error: true, message: error.message });
  }
});

app.delete("/delete-image", async(req, res) => {
  const { imageUrl }= req.query;

  if(!imageUrl){
    return res.status(400).json({ error: true, message: "imageUrl parameter is required"})
  }

  try {
    // Extract the filename from the imageUrl
    const filename= path.filename(imageUrl);

    // Define the file path
    const filePath= path.join(__dirname, 'uploads', filename);

     // Check if file exists
    if(fs.existsSync(filePath)){
      // Delete the file from the uploads folder
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "Image Deleted Successfully"})
    }
    else {
      res.status(200).json({ error: true, message: "Image not found"})
    }
  }
  catch(error) {
    res.status(500).json({ error: true, message: error.message });
  }
})

app.put("/update-is-favourite/:id", auth, async(req, res) => {
  const { id }= req.params;
  const { isFavourite }= req.body;
  const { userId }= req.user;

  try{
      const blogStory= await Blogs.findOne({_id: id, userId: userId});

      if(!blogStory){
          return res.status(400).json({ error: true, message: "Blog not found"});
      }

      blogStory.isFavourite= isFavourite;

      await blogStory.save();
      res.status(200).json({ story: blogStory, message: "Update Succesful"});
  }
  catch(error){
      res.status(500).json({ error: true, message: error.message });
  }
});

//update view and like count
app.put("/update-view-count/:id", async(req, res) => {
    try {
      const blogId= req.params.id;
      const blog= await Blogs.findById(blogId);

      if(blog) {
        blog.views += 1;
        await blog.save();
        res.status(200).json({ success: true, blog});
      }
      else {
        res.status(404).json({ message: "Blog not found"});
      }
    }
    catch(error) {
      res.status(500).json({error: true, message: error.message})
    }
});

app.put("/update-like-count/:id", async(req,res) => {
  const { increase } = req.body;
  try {
    const blogId= req.params.id;
    const blog= await Blogs.findById(blogId);

    if(blog) {
      if(increase)  blog.likes += 1;
      else if (blog.likes > 0) blog.likes -= 1;

      await blog.save();
      res.status(200).json({ success: true, blog});
    }
    else {
      res.status(404).json({ message: "Blog not found"});
    }
  }
  catch(error) {
    res.status(500).json({error: true, message: error.message})
  }
})

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, '../frontend/dist')));



// Catch-all route for frontend
app.get('*', (req, res) => {
  console.log(`Serving static file for ${req.url}`);
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Server Error');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
