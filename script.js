let myLibrary = [];
/* eslint-disable require-jsdoc */
class Books {
  constructor(title, author, pages, read) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
  }
  get wasRead() {
    return this.Read ? 'Already read.' : 'Still unread.';
  }
}

// Books.prototype.info = function () {
//   return `${this.title}, by ${this.author}. ${this.pages} pages. ${this.wasRead}`;
// };

function addToLibrary(book) {
  myLibrary.push(book);
}

function viewLibrary() {
  myLibrary.forEach(function (singleBook) {
    let books = document.createElement('tr');
    tableProperties.innerHTML = '';
    Object.entries(singleBook).forEach((bookData) => {
      let props = document.createElement('td');
      let dataBody = document.createElement('td');
      props.textContent = bookData[0];
      dataBody.textContent =
        bookData[0] === 'Read' ? singleBook.wasRead : bookData[1];
      books.appendChild(dataBody);
      tableProperties.appendChild(props);
    });
    tableBody.appendChild(books);
  });
}

const hobbit = new Books('The Hobbit', 'J.R.R Tolkien', 300, false);
addToLibrary(hobbit);
viewLibrary();
