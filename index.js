const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to the port 4000");
});

app.get("/hello", (req, res) => {
  //   res.send("hello dear");
  res.json({
    success: "true",
    message: "get request to /hello",
  });
});

app.get("/hi", (req, res) => {
  // res.send("hidear");
  res.status(201).json({
    success: "true",
    message: "get request to /hi",
  });
});

app.get("/postreq", (req, res) => {
  res.status(500).json({
    name: "nutan",
  });
});

app.get("/bond", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "bond",
  });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
