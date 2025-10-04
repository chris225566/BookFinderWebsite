// Function to search books from Google Books API
async function searchBooks() {
  const query = document.getElementById("searchInput").value;
  const resultsDiv = document.getElementById("bookResults");
  resultsDiv.innerHTML = "";

  // Check if search box is empty
  if (!query) {
    resultsDiv.innerHTML = "<p class='text-danger'>Please enter a search term.</p>";
    return;
  }

  // Call Google Books API
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  const data = await response.json();

  if (!data.items) {
    resultsDiv.innerHTML = "<p>No books found.</p>";
    return;
  }

  // Loop through each book result
  data.items.forEach(book => {
    const info = book.volumeInfo;
    const title = info.title || "No Title";
    const authors = info.authors ? info.authors.join(", ") : "Unknown Author";
    const image = info.imageLinks ? info.imageLinks.thumbnail : "https://via.placeholder.com/128x200?text=No+Cover";

    // Create Bootstrap card for book
    const card = `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="${image}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">by ${authors}</p>
            <button class="btn btn-outline-primary" onclick="addToFavorites('${book.id}')">❤️ Favorite</button>
            <a href="details.html?id=${book.id}" class="btn btn-dark">View Details</a>
          </div>
        </div>
      </div>
    `;
    resultsDiv.innerHTML += card;
  });
}

// Function to add book to favorites using localStorage
function addToFavorites(bookId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(bookId)) {
    favorites.push(bookId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Book added to Favorites!");
  } else {
    alert("Already in Favorites!");
  }
}