const Post = require('../models/Post');

// @desc    Get all posts (with filtering and sorting)
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  const { sort, page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    let postsQuery;

    // Use aggregation to allow sorting by array size for 'most-liked' and 'most-commented'
    if (sort === 'most-liked') {
      postsQuery = Post.aggregate([
        {
          $addFields: {
            likesCount: { $size: '$likes' },
          },
        },
        { $sort: { likesCount: -1, createdAt: -1 } },
        { $skip: skip },
        { $limit: parseInt(limit) },
      ]);
    } else if (sort === 'most-commented') {
      postsQuery = Post.aggregate([
        {
          $addFields: {
            commentsCount: { $size: '$comments' },
          },
        },
        { $sort: { commentsCount: -1, createdAt: -1 } },
        { $skip: skip },
        { $limit: parseInt(limit) },
      ]);
    } else {
      // Default: Newest first
      postsQuery = Post.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
    }

    const posts = await postsQuery;
    const total = await Post.countDocuments();

    res.status(200).json({
      posts,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving posts' });
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private (Protected)
const createPost = async (req, res) => {
  const { textContent } = req.body;
  
  // Checking if image was uploaded
  let imageContent = '';
  if (req.file) {
    // Save path relative to public directory
    imageContent = `/uploads/${req.file.filename}`;
  }

  // Either text or image is required (both cannot be empty)
  if (!textContent && !imageContent) {
    return res.status(400).json({ message: 'Post must contain either text or an image' });
  }

  try {
    const newPost = await Post.create({
      user: {
        userId: req.user._id,
        username: req.user.username,
        avatar: req.user.avatar,
      },
      textContent: textContent || '',
      imageContent: imageContent,
      likes: [],
      comments: [],
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating post' });
  }
};

// @desc    Toggle like on a post
// @route   POST /api/posts/:id/like
// @access  Private (Protected)
const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user already liked
    const alreadyLikedIndex = post.likes.findIndex(
      (like) => like.userId.toString() === req.user._id.toString()
    );

    if (alreadyLikedIndex > -1) {
      // Unlike: remove user's like
      post.likes.splice(alreadyLikedIndex, 1);
    } else {
      // Like: add user's like
      post.likes.push({
        userId: req.user._id,
        username: req.user.username,
      });
    }

    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error toggling like' });
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:id/comment
// @access  Private (Protected)
const addComment = async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ message: 'Comment text is required' });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create comment
    const comment = {
      userId: req.user._id,
      username: req.user.username,
      text: text.trim(),
    };

    post.comments.push(comment);
    await post.save();

    // Return the updated comments list
    res.status(201).json(post.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding comment' });
  }
};

module.exports = {
  getPosts,
  createPost,
  toggleLike,
  addComment,
};
