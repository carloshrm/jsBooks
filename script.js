class Books {
  constructor(title, author, pages, read) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
  }
}
Books.prototype.info = function () {
  return `${this.title}, by ${this.author}. ${this.pages} pages. ${this.wasRead}`;
};
Books.prototype.wasRead = function () {
  return this.Read ? 'Yes.' : 'Not yet.';
};
Books.prototype.setRead = function () {
  this.Read = true;
};

const formData = document.querySelectorAll('#bookInput input');
document
  .getElementById('bookInput')
  .addEventListener('submit', addBookFromForm);
document.getElementById('showForm').addEventListener('click', showForm);
clearButton.addEventListener('click', clearLibrary);
let myLibrary = [];

function showForm() {
  if (addFormContainer.style.display == 'none') {
    addFormContainer.style.display = 'grid';
  } else {
    addFormContainer.style.display = 'none';
  }
}

function clearLibrary() {
  myLibrary = [];
  localStorage.clear();
  checkStorage();
}

function addBookFromForm(e) {
  e.preventDefault();
  newBook = new Books();
  formData.forEach((x) => {
    if (x.id === 'submitFormButton') return;
    if (x.id === 'Read') {
      newBook[x.id] = x.checked;
      x.checked = false;
    } else {
      newBook[x.id] = x.value;
      x.value = '';
    }
  });
  myLibrary.push(newBook);
  viewLibrary();
}

function checkEmptyLibrary() {
  if (myLibrary.length === 0) {
    const empty = document.createElement('td');
    empty.innerText = 'Empty';
    tableProperties.replaceChildren(empty);
    return;
  }
}

function viewLibrary() {
  tableBody.innerHTML = '';
  checkEmptyLibrary();

  myLibrary.forEach(function (singleBook) {
    const books = document.createElement('tr');
    tableProperties.innerHTML = '';

    Object.entries(singleBook).forEach((bookData) => {
      const headProperties = document.createElement('td');
      headProperties.textContent = bookData[0];
      tableProperties.appendChild(headProperties);
      const dataBody = document.createElement('td');

      if (bookData[0] === 'Read') {
        dataBody.textContent = singleBook.wasRead();
        if (!bookData[1]) dataBody.appendChild(makeSwitchButton(singleBook));
      } else {
        dataBody.textContent = bookData[1];
      }
      books.appendChild(dataBody);
    });

    tableBody.appendChild(books);
    books.appendChild(makeRemoveButton(singleBook));
  });
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

  function makeRemoveButton(singleBook) {
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', () => {
      myLibrary.splice(myLibrary.indexOf(singleBook), 1);
      viewLibrary();
    });
    removeButton.innerText = 'Remove';
    return removeButton;
  }

  function makeSwitchButton(singleBook) {
    const switchButton = document.createElement('button');
    switchButton.id = 'switchButton';
    switchButton.addEventListener('click', () => {
      singleBook.setRead();
      viewLibrary();
    });
    switchButton.innerText = 'Read it!';
    return switchButton;
  }
}

function checkStorage() {
  if (localStorage.getItem('myLibrary') === null) {
    myLibrary[0] = new Books('The Hobbit', 'J.R.R Tolkien', 300, false);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  } else {
    libraryFromStorage();
  }
  viewLibrary();
}

function libraryFromStorage() {
  const tempLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  tempLibrary.forEach((entry) => {
    const tempBook = new Books();
    Object.entries(entry).forEach((data) => {
      tempBook[data[0]] = data[1];
    });
    myLibrary.push(tempBook);
  });
}
checkStorage();
