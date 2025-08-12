import { model, Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },

  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
  },

  author: { type: String, required: true },
});

const Post = model("Post", postSchema);

export default Post;
