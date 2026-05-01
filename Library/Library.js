const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
}

function displayLibrary() {
  const container = document.getElementById("library");
  container.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book");
    card.dataset.id = book.id;

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = "Author: " + book.author;

    const pages = document.createElement("p");
    pages.textContent = "Pages: " + book.pages;

    const status = document.createElement("p");
    status.textContent = book.read ? "Read" : "Not read";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      removeBook(book.id);
    });

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Change status";
    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      displayLibrary();
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(toggleBtn);
    card.appendChild(deleteBtn);

    container.appendChild(card);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
  displayLibrary();
}

const form = document.getElementById("bookForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  form.reset();
});