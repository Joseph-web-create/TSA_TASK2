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

export const updatePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) return next(createHttpError(404, "Post not found"));

    res
      .status(200)
      .json({ success: true, message: "Post updated", post: updatedPost });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) return next(createHttpError(404, "Post not found"));

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    next(error);
  }
};
