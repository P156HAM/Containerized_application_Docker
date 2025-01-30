document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");
  const BACKEND_URL = "http://localhost:3001";
  const fetchBooks = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch books!");
      }
      const responseData = await response.json();
      const books = responseData.data;

      if (!books || books.length === 0) {
        contentDiv.innerHTML = "<p> No books available <p>";
        return;
      }

      const list = document.createElement("ul");
      books.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.textContent = book.title;
        list.appendChild(listItem);
      });

      contentDiv.innerHTML = "";
      contentDiv.appendChild(list);
    } catch (error) {
      contentDiv.innerHTML = `<p class="error"> Backend is down. Services are not available. </p>`;
      console.info("Fetch Books Error:", error);
    }
  };

  fetchBooks();
});
