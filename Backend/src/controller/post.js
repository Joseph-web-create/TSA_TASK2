import createHttpError from "http-errors";
import Post from "../models/post.js";

export const createPost = async (req, res, next) => {
  const { title, content } = req.body;

  const author = req.user?.id;
  const user = req.user;

  try {
    if (!title || !content) {
      return next(createHttpError(400, "Title and content are required"));
    }

    const post = await Post.create({
      title,
      content,
      author,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate("author", "name email");
  res.status(200).json({ success: true, posts });
};

export const getOnePost = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createHttpError(400, "Post id is required"));
  }
  try {
    const post = await Post.findById(id).populate("author", "name, email");

    if (!post) return next(createHttpError(404, "Post not found"));

    res.status(200).json({ post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      return next(createHttpError(400, "Post id is required"));
    }
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) return next(createHttpError(404, "Post not found"));

    if (req.user.role !== "admin" && updatePost.author !== req.user.id) {
      return next(
        createHttpError(403, "Forbidden: you can only update you own post")
      );
    }
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
    if (!id) {
      return next(createHttpError(400, "Post id is required"));
    }
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) return next(createHttpError(404, "Post not found"));

    if (req.user.role !== "admin" && updatePost.author !== req.user.id) {
      return next(
        createHttpError(403, "Forbidden: you can only delete you own post")
      );
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    next(error);
  }
};
