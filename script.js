const form = document.querySelector('.book-form');
const formButton = document.querySelector('.open-form button');
let formOpen = false;

const submitButton = document.querySelector('.add-book');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputStatus = document.querySelector('#status');
const myLibrary = [];

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
    bookDiv.classList.add('book');
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-info');

    const statusButton = document.createElement('button');
    statusButton.classList.add('edit-status');
    statusButton.textContent = 'Change Status';

    const fields = [
        { class: 'title', text: title},
        { class: 'author', text: 'by ' + author},
        { class: 'pages', text: pages + ' pages'},
        { class: 'status', text: status},
    ];

    fields.forEach(({ class: divClass, text }) => {
        const div = document.createElement('div');
        div.classList.add(divClass);
        div.textContent = text;
        bookInfo.appendChild(div)
    });

    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(statusButton);
    document.querySelector('.bookcase').appendChild(bookDiv);

    inputTitle.value = '';
    inputAuthor.value = '';
    inputPages.value = '';
    inputStatus.value = '';

    statusButton.addEventListener('click', () => {
        const statusDiv = statusButton.closest('.book').querySelector('.book-info .status');
        changeReadStatus(newBook, statusButton, statusDiv);
    });
});

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(myLibrary);
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