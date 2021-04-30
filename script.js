let myLibrary = [];

// document
//   .getElementById('submitFormButton')
//   .addEventListener('click', addToLibrary);
const formData = document.querySelectorAll('#bookInput input');
document.getElementById('bookInput').addEventListener('submit', addToLibrary);

document.getElementById('showForm').addEventListener('click', showForm);
function showForm() {
  if (addFormContainer.style.display == 'none') {
    addFormContainer.style.display = 'grid';
  } else {
    addFormContainer.style.display = 'none';
  }
}

class Books {
  constructor(title, author, pages, read) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
  }
  // get info() {
  //   return `${this.title}, by ${this.author}. ${this.pages} pages. ${this.wasRead}`;
  // }
  // get wasRead() {
  //   return this.Read ? 'Already read.' : 'Still unread.';
  // }
}
Books.prototype.info = function () {
  return `${this.title}, by ${this.author}. ${this.pages} pages. ${this.wasRead}`;
};
Books.prototype.wasRead = function () {
  return this.Read ? 'Already read.' : 'Still unread.';
};

function addToLibrary(e) {
  e.preventDefault();
  newBook = new Books();
  formData.forEach((x) => {
    if (x.id === 'submitFormButton') return;
    if (x.id === 'Read') {
      newBook[x.id] = x.checked;
    } else {
      newBook[x.id] = x.value;
    }
  });
  myLibrary.push(newBook);
  viewLibrary();
}

function viewLibrary() {
  tableBody.innerHTML = '';
  myLibrary.forEach(function (singleBook) {
    let books = document.createElement('tr');
    tableProperties.innerHTML = '';
    Object.entries(singleBook).forEach((bookData) => {
      let props = document.createElement('td');
      let dataBody = document.createElement('td');
      props.textContent = bookData[0];
      dataBody.textContent =
        bookData[0] === 'Read' ? singleBook.wasRead() : bookData[1];
      books.appendChild(dataBody);
      tableProperties.appendChild(props);
    });
    tableBody.appendChild(books);
  });
}
function clearForm() {}

const hobbit = new Books('The Hobbit', 'J.R.R Tolkien', 300, false);
viewLibrary();
