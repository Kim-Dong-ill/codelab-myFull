const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { Blog } = require("../models/Blog");
const User = require("../models/User");
const commentRouter = Router({ mergeParams: true }); //라우터의 상위를 params를 인식하도록
const { Comment } = require("../models/Comment");

commentRouter.post("/", async (req, res) => {
  try {
    const { blogId } = req.params; //커멘트라우터의 url을 바라보고 있는데 blogId는
    //상위 server에 있어서 mergeParams를 true로 해준다.

    const { userId, content } = req.body;

    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).send({ message: "blogId is not" });
    }
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({ message: "UserId is not" });
    }
    if (typeof content !== "string") {
      return res.status(400).send({ message: "content is not" });
    }

    // const blog = await Blog.findById(blogId);
    // const user = await User.findById(userId);
    const [blog, user] = await Promise.all([
      Blog.findById(blogId),
      User.findById(userId),
    ]);

    const comment = await new Comment({
      content,
      blog,
      user,
    }).save();
    return res.status(200).send({ comment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

commentRouter.get("/", async (req, res) => {
  try {
    const { blogId } = req.params;

    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).send({ message: "blogId is not" });
    }

    const comment = await Comment.find({ blog: blogId })
      .populate([
        {
          path: "user",
          select: "email name",
        },
      ])
      .sort({ createdAt: -1 }); //댓글 입력하면 뒤로 오도록
    return res.status(200).send({ comment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

commentRouter.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(400).send({ message: "commentId is not" });
    }
    return res.status(200).send({ message: "댓글 삭제 완료" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
// commentRouter.delete("/", async (req, res) => {
//   try {
//     return res.status(200).send({ comment });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

module.exports = commentRouter;
