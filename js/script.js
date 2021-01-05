let myLibrary = [];

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    const readText = this.isRead ? ' already read' : ' not read yet'
    console.log(
      this.title + ' by ' + this.author + ', ' + this.pages + ' pages,' + readText
    );
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

//getting element ref's
const newBookButton = document.querySelector('#new-button');
const formPopup = document.querySelector('.popup');
const bookForm = document.forms.form;
const addBookButton = document.querySelector('#add-button');
const closeFormButtom = document.querySelector('.close');
const libraryContainer = document.querySelector('.library-container')

//setting up listeners
newBookButton.addEventListener('click', () => formPopup.classList.add('display'));
closeFormButtom.addEventListener('click', () => formPopup.classList.remove('display'));
addBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  const formData = new FormData(bookForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const isRead = formData.get('read') !== null ? true : false;
  formPopup.classList.remove('display');
  addBookToLibrary(new Book(title, author, pages, isRead));
  saveLibrary(myLibrary);
  bookForm.reset();
  render();
});

function display(book) {
  const cardDiv = document.createElement('div');
  const cardTitle = document.createElement('h4');
  const cardAuthor = document.createElement('p');
  const cardPages = document.createElement('p');
  const cardReadButton = document.createElement('button');
  const cardRemoveButton = document.createElement('button');

  cardDiv.setAttribute('id', myLibrary.indexOf(book));
  cardDiv.classList.add('book')
  cardTitle.classList.add('pacifico-font');
  cardAuthor.classList.add('pacifico-font');
  cardPages.classList.add('pacifico-font');
  cardReadButton.classList.add('pacifico-font');
  cardRemoveButton.classList.add('pacifico-font');

  cardTitle.textContent = book.title;
  cardAuthor.textContent = book.author;
  cardPages.textContent = book.pages + ' pages';

  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(cardAuthor);
  cardDiv.appendChild(cardPages);
  cardDiv.appendChild(cardReadButton);
  cardDiv.appendChild(cardRemoveButton);

  libraryContainer.appendChild(cardDiv);

  if (!book.isRead) {
    cardReadButton.textContent = 'Not read';
    cardReadButton.parentElement.classList.add('book-not-read');
  } else {
    cardReadButton.textContent = 'Read';
    cardReadButton.parentElement.classList.add('book-read');
  }

  cardReadButton.addEventListener('click', (event) => {
    console.warn(event);
    book.isRead = !book.isRead;
    saveLibrary(myLibrary);
    render();
  });

  cardRemoveButton.textContent = 'Remove';
  cardRemoveButton.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    saveLibrary(myLibrary);
    render();
  });
}

function render() {
  const displayedBooks = document.querySelectorAll('.book');
  displayedBooks.forEach(displayedBook => {
    libraryContainer.removeChild(displayedBook);
  });

  myLibrary.forEach(book => {
    display(book);
  });
}

function saveLibrary(library) {
  localStorage.setItem('library', JSON.stringify(library));
}

function getLibrary() {
  let library = localStorage.getItem('library');
  if (!library) {
    return [];
  } else {
    return JSON.parse(library);
  }
}

myLibrary = getLibrary();
render();
