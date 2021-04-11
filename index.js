const express = require("express");
const app = express();
const port = 3000;

// mongodb
require("./config/db");

// mongodb Book model
const Book = require("./models/Book");

// Form data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/setRecord", (req, res) => {
  const details = req.body;
  const { bookTitle, authorName } = details;

  const newRecord = new Book({
    bookTitle,
    authorName,
  });

  newRecord
    .save()
    .then((result) => {
      res.json({
        Id: result._id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        Error: "An error occurred while setting record.",
      });
    });
});

app.get("/getRecord/:bookId", (req, res) => {
  const { bookId } = req.params;

  Book.find({ bookId })
    .then((result) => {
      const { bookTitle, authorName } = result;
      res.json({
        bookTitle,
        authorName,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        Error: "An error occurred while getting record.",
      });
    });
});

app.get("/", (req, res) => {
  res.send("A rest API application!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
