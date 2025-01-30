db = db.getSiblingDB("booksdb");

db.createCollection("books");
db.books.insertMany([
  { title: "How to master Docker Compose" },
  { title: "How hard should it be to delete a file on windows" },
  { title: "1991" },
  { title: "The Silo" },
]);
