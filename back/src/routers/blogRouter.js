const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const { Blog } = require("../models/Blog");
const blogRouter = express.Router();

blogRouter.post("/", async function (req, res) {
  try {
    const { title, content, isLive, userId } = req.body;

    if (typeof title !== "string") {
      res.status(400).send({ error: "title is required" });
    }
    if (typeof content !== "string") {
      res.status(400).send({ error: "content is required" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      res.status(400).send({ error: "userId is required" });
    }

    let user = await User.findById(userId); //유저 있는지 없는지 확인
    if (!user) res.status(400).send({ error: "user dose not" });

    let blog = new Blog({ ...req.body, user });
    await blog.save();
    return res.status(200).send({ blog });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    return res.status(200).send({ blogs });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { blogRouter };
