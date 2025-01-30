import express from "express";
import mongoose, { Schema, model } from "mongoose";
import cors from "cors";

const app = express();

const PORT = 3001;
const { DB_USER, DB_PWD } = process.env;
const DB_NAME = "booksdb";
const DB_HOST = "mongo";
const MONGO_URI = `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:27017/${DB_NAME}?authSource=admin`;

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

const bookSchema = new Schema({
  title: { type: String, required: true },
});
const Book = model("book", bookSchema);

const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return sendResponse(res, 404, false, "No books available!");
    }
    sendResponse(res, 200, true, "Books retrieved successfully", books);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id });
    if (!book) {
      return sendResponse(res, 404, false, "Book not found!");
    }
    sendResponse(res, 200, true, "Book retrieved successfully", book);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
});

app.post("/books", async (req, res) => {
  try {
    const { title } = req.body;
    const newBook = new Book({ title });
    await newBook.save();
    sendResponse(res, 200, true, "Book created successfully", newBook);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedBook = await Book.findOneAndUpdate(
      { _id: id },
      { title },
      { new: true }
    );
    if (!updatedBook) {
      return sendResponse(res, 404, false, "Book not found!");
    }
    sendResponse(
      res,
      200,
      true,
      `Book ${id} updated successfully`,
      updatedBook
    );
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findOneAndDelete({ _id: id });
    if (!deletedBook) {
      return sendResponse(res, 404, false, "Book not found");
    }
    sendResponse(
      res,
      200,
      true,
      `The book with ID ${id} was deleted successfully`,
      deletedBook
    );
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listning at http://localhost:${PORT}`);
});
