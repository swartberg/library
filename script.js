const form = document.querySelector('.book-form');
const formButton = document.querySelector('.open-form button');
let formOpen = false;

const submitButton = document.querySelector('.add-book');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputStatus = document.querySelector('#status');
let library = [];

formButton.addEventListener('click', showForm);

function showForm(e) {
    e.preventDefault();
    form.classList.toggle('hidden');
    formOpen = !formOpen;
    if (formOpen === true) {
        formButton.textContent = "CLOSE";
    }
    else if (formOpen === false) {
        formButton.textContent = "NEW BOOK"
    }
}

function Book(title, author, pages, status, bookId) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = bookId;
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const title = inputTitle.value;
    const author = inputAuthor.value;
    const pages = inputPages.value;
    const status = inputStatus.checked ? 'Read' : 'Not read';
    const bookId = self.crypto.randomUUID();

    const newBook = new Book(title, author, pages, status, bookId);
    console.log(newBook);
    addBookToLibrary(newBook);

    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.dataset.id = newBook.id;

    bookDiv.innerHTML =
    `
    <div class="book-info">
        <div class="title">${title}</div>
        <div class="author">${author}</div>
        <div class="pages">${pages}</div>
        <div class="status">${status}</div>
    </div>
    <button class="edit-status">Change Status</button>
    <button class="remove-book">Remove</button>
    `;

    const statusButton = bookDiv.querySelector('.edit-status');
    const removeButton = bookDiv.querySelector('.remove-book');
    const statusDiv = bookDiv.querySelector('.status');

    statusButton.addEventListener('click', () => {
        changeReadStatus(newBook, statusButton, statusDiv);
    });

    removeButton.addEventListener('click', () => {
        const bookId = bookDiv.dataset.id;

        removeBook(bookId);
        bookDiv.remove();
    });

    document.querySelector('.bookcase').appendChild(bookDiv);

    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputStatus.checked = false;
});

function addBookToLibrary(book) {
    library.push(book);
    console.log(library);
};

function changeReadStatus(book, button, statusDiv) {
    if (book.status === 'Read') {
        book.status = 'Not read';
        button.textContent = 'Mark Read';
    }
    else {
        book.status = 'Read';
        button.textContent = 'Mark Unread';
    }

    statusDiv.textContent = book.status;
}

function removeBook(bookId) {
    library = library.filter(book => book.id !== bookId);
    console.log(library);
}
