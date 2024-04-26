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
    let { page } = req.query;
    page = parseInt(page); //page를 숫자로 형변환
    const totalCnt = await Blog.countDocuments({}); //Blogs의 문서 전체 수가 온다.
    const blogs = await Blog.find({})
      .skip(page * 5)
      .limit(5)
      .populate({
        //limit는 한페이지에 보여질 수 이다.
        //skip은 page를 나타내는데 0부터 시작이다. 0*5 는 0 이다. 0부터 5개(limit)보여주고
        //page가 1이면 1*5 = 5부터 5개 보여준다는 말이다.
        path: "user",
        select: "email name",
      });
    //populate는 blogs에 user에 userId만 들어온다. 하지만 blog를 구성할때
    //타이틀, 컨텐츠, 유저이름 이 필요하다. 때문에 userId를 이용해 axios로 db를 한번 더 다녀와야한다.
    //이걸 편하게 하기위해 사용했고 path로 어디서 가져올지 적는다. (아마 User에서 "user"일듯)
    //select는 그중 선택해서 가져오는것이고 -붙은거는 빼고 가져온다는 말이다.
    //추가로 populate는 같은 userId가 있으면 한번에 가져와서 더 빠르다.
    return res.status(200).send({ blogs, totalCnt });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.get("/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!mongoose.isValidObjectId(blogId)) {
      res.status(400).send({ message: "not blogId" });
    }
    const blog = await Blog.findOne({ _id: blogId }).populate({
      path: "user",
      select: "email name",
    });
    return res.status(200).send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { blogRouter };
