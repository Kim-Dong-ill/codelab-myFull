const faker = require("faker");
const User = require("./src/models/User");
const { hash } = require("bcryptjs");
const { Blog } = require("./src/models/Blog");

const getFaker = async (userCount, blogsCounter) => {
  const users = [];
  const blogs = [];

  const password = await hash("1111", 10);

  for (let i = 0; i < userCount; i++) {
    users.push(
      new User({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password,
        role: 0,
        createdAt: Date.now(),
      })
    );
  }

  //blog faker 만들기
  users.map((user) => {
    for (let i = 0; i < blogsCounter; i++) {
      blogs.push(
        new Blog({
          title: faker.lorem.words(),
          content: faker.lorem.paragraphs(),
          isLive: true,
          user,
        })
      );
    }
  });

  console.log("fake data start");
  await User.insertMany(users);
  console.log(blogs);
  await Blog.insertMany(blogs);
  console.log("fake data complete");
};

module.exports = { getFaker };
