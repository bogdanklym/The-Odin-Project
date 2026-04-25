const myLibrary = [];

// Constructor
function Book(title, author, pages, read){
this.id = crypto.randomUUID();
this.title = title;
this.author = author;
this.pages = pages;
this.read = read;
}

// Prototype to toggle read status
Book.prototype.toggleRead = function(){
this.read = !this.read;
};

// Add book to library
function addBookToLibrary(title, author, pages, read){
const newBook = new Book(title, author, pages, read);
myLibrary.push(newBook);
displayBooks();
}

// Display books
function displayBooks(){

const libraryDiv = document.getElementById("library");
libraryDiv.innerHTML = "";

myLibrary.forEach(book => {

const card = document.createElement("div");
card.classList.add("book");
card.dataset.id = book.id;

card.innerHTML = `
<h3>${book.title}</h3>
<p>${book.author}</p>
<p>${book.pages} pages</p>
<p>${book.read ? "Read" : "Not Read"}</p>
<button class="toggle">Toggle Read</button>
<button class="delete">Delete</button>
`;

libraryDiv.appendChild(card);

// delete
card.querySelector(".delete").addEventListener("click", () => {
const index = myLibrary.findIndex(b => b.id === book.id);
myLibrary.splice(index,1);
displayBooks();
});

// toggle read
card.querySelector(".toggle").addEventListener("click", () => {
book.toggleRead();
displayBooks();
});

});

}


// Dialog logic
const dialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const closeDialog = document.getElementById("closeDialog");
const form = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => {
dialog.showModal();
});

closeDialog.addEventListener("click", () => {
dialog.close();
});

form.addEventListener("submit", (e) => {

e.preventDefault();

const title = document.getElementById("title").value;
const author = document.getElementById("author").value;
const pages = document.getElementById("pages").value;
const read = document.getElementById("read").checked;

addBookToLibrary(title,author,pages,read);

form.reset();
dialog.close();

});


// Test books
addBookToLibrary("1984","George Orwell",328,true);
addBookToLibrary("The Hobbit","Tolkien",295,false);