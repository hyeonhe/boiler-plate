const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("./models/User");

const config = require("./config/key");
const { User } = require("./models/User");

// application/x-www-form-urlendcode
// app.use(bodyParser.urlencoded({ extended: true }));

// //application/json
// app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("hello world!!!");
});

app.post("/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ sucess: false, err });
    // status(200) -> 성공
    return res.status(200).json({
      sucess: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
