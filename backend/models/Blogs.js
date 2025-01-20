const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const blogsSchema= new Schema({
    title: { type: String, required: true },
    story: { type: String, required: true },
    visitedLocation: { type: [String], default: []},
    isFavourite: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdOn: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    visitedDate: { type: Date, required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0},

});

module.exports= mongoose.model("Blogs", blogsSchema);