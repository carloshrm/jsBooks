let myLibrary = [];
const mainBooks = document.querySelector('div', '#main-Books');

/* eslint-disable require-jsdoc */
function Books(title, author, pages, wasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.wasRead = wasRead;
}

Books.prototype.info = function () {
  let read = this.wasRead ? 'Already read.' : 'Not read yet.';
  return `${this.title}, by ${this.author}. ${this.pages} pages. ${read}`;
};

function addToLibrary(book) {
  myLibrary.push(book);
}

function viewLibrary() {
  myLibrary.forEach(function (aBook) {
    let books = null;
    aBook.info();
    books = document.createElement('p');
    books.textContent = aBook.info();
    mainBooks.appendChild(books);
  });
}

const hobbit = new Books('The Hobbit', 'J.R.R Tolkien', 300, false);

console.log(hobbit.info());
