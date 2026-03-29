import { Posts } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find().populate("author", "username");
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched Successfully"));
});

const createPost = asyncHandler(async (req, res) => {
  const { title, content, description } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  const localImagePath = req.file?.path;

  if (!localImagePath) {
    throw new ApiError(400, "Image file is required");
  }

  const cloudinaryResponse = await uploadOnCloudinary(localImagePath);

  if (!cloudinaryResponse) {
    throw new ApiError(400, "Error while uploading image to Cloudinary");
  }

  const newPost = await Posts.create({
    title,
    content,
    author: req.user._id,
    description,
    image: cloudinaryResponse.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newPost, "Post Created Successfully"));
});

const getPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Posts.findById(id).populate({
    path: "comments",
    populate: {
      path: "author",
      select: "username", // Only get the username for security
    },
  }).populate("author", "username"); // Also populate the post's author

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});


const editPost = asyncHandler(async (req, res) => {
  const postId = req.params.id?.trim();
  const { title, content, description } = req.body;

  const post = await Posts.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to edit this post");
  }

  let imageUrl = post.image;
  const localImagePath = req.file?.path;

  if (localImagePath) {
    const cloudinaryResponse = await uploadOnCloudinary(localImagePath);
    if (cloudinaryResponse) {
      imageUrl = cloudinaryResponse.url;
    }
  }

  const updatedPost = await Posts.findByIdAndUpdate(
    postId,
    {
      $set: {
        title,
        content,
        description,
        image: imageUrl,
      },
    },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

// controllers/comment.controller.js
const addCommentToPost = asyncHandler(async (req, res) => {
  const id = req.params.id?.trim(); // Post ID
  const { content, parentCommentId } = req.body;

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  const post = await Posts.findById(id);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // 1. Create the comment
  const newComment = await Comment.create({
    content,
    author: req.user._id,
    post: id,
    parentComment: parentCommentId || null,
  });

  // 2. CRITICAL: Add the comment ID to the Post document so it's storable
  post.comments.push(newComment._id);
  await post.save();

  // 3. Populate the author so the frontend can show the username immediately
  const populatedComment = await Comment.findById(newComment._id).populate("author", "username");

  return res
    .status(201)
    .json(new ApiResponse(201, populatedComment, "Comment Added Successfully"));
});

const deletePostById = asyncHandler(async (req, res) => {
  const postId = req.params.id?.trim();

  const post = await Posts.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  await post.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});

export {
  getAllPosts,
  createPost,
  editPost,
  getPostById,
  addCommentToPost,
  deletePostById,
};
