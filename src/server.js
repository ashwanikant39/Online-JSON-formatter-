const path = require("path");
const express = require("express");
const app = express();
const port = 8000;

const staticpath = path.join(__dirname, "../public");
console.log(staticpath);
app.use(express.static(staticpath));

app.get("/", (req, res) => {
  //   console.log("hello");

  res.send("hello wrold!!");
});
app.get("/*", (req, res) => {
  res.status(404).send("Page not found");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
