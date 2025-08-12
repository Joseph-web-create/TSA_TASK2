import createHttpError from "http-errors";
import Post from "../models/post.js";

export const createPost = async (req, res, next) => {
  const { title, content, author } = req.body;

  try {
    if (!title || !content || !author) {
      return next(
        createHttpError(400, "Title, content, and author are required")
      );
    }

    const post = await Post.create({
      title,
      content,
      author,
    });

    res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};
