const myLibrary = [];

class Book {
  constructor(title, author, pages, read, id) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._read = read;
    this._id = id;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get author() {
    return this._author;
  }

  set author(newAuthor) {
    this._author = newAuthor;
  }

  get pages() {
    return this._pages;
  }

  set pages(newPages) {
    this._pages = newPages;
  }

  get read() {
    return this._read;
  }

  set read(newReadStatus) {
    this._read = newReadStatus;
  }

  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }
}


Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();

    if (title && author && pages) {
        const newBook = new Book(title, author, pages, read, id);
        myLibrary.push(newBook);
    } else {
        alert("Please fill in all fields.");
    }
}

function displayBooks() {
    // Clear existing books without using innerHTML
    const libraryContainer = document.querySelector(".library");
    while (libraryContainer.firstChild) {
        libraryContainer.removeChild(libraryContainer.firstChild);
    }
    myLibrary.forEach((book) => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");
        bookContainer.setAttribute("data-id", book.id);

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${ book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const readButton = document.createElement("button");
        readButton.textContent = book.read ? "Read" : "Unread";
        readButton.style.backgroundColor = book.read ? "green" : "red"; // Set initial color based on read status
        readButton.classList.add("read-button");

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");

        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(pages);
        buttonContainer.appendChild(readButton);
        buttonContainer.appendChild(removeButton);
        bookContainer.appendChild(buttonContainer);

        document.querySelector(".library").appendChild(bookContainer);

        readButton.addEventListener("click", () => {
            book.toggleRead();
            readButton.textContent = book.read ? "Read" : "Unread";
            if (book.read) {
                readButton.style.backgroundColor = "green"; // or whatever color you want for "Read"
            } else {
                readButton.style.backgroundColor = "red"; // or another color for "Not Read"
            }
        });

        removeButton.addEventListener("click", () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            document.querySelector(".library").removeChild(bookContainer);
        });
    })
}

let newBookModal = document.querySelector("#newBookModal")

function addNewBook(){
    //Making the form visable
    newBookModal.style.display = 'flex'
  
    //Event listeners for closing the menu
    let cancelButton = document.querySelector(".btn-cancel")
    let closeBtn = document.querySelector(".close-btn")
  
    closeBtn.addEventListener("click",() =>{
      newBookModal.style.display = 'none'
      })
  
    cancelButton.addEventListener("click",() =>{
      newBookModal.style.display = 'none'
    })
  }


  //EVENT LISTENERS
  
  //Add new book
  let addBookButton = document.querySelector("#newBookBtn")
  addBookButton.addEventListener("click",addNewBook)
  
  //********************************** */
  
  //Grabbing the inputs from the forum
  let form = document.querySelector("#newBookForm")
  
  form.addEventListener("submit",(e) =>{
    e.preventDefault(); //Stops page from refreashing
    console.log("Form submitted!");
  
    const formData = new FormData(form) 
  
    let bookTitle = formData.get("title")
    let bookAuthor = formData.get("author")
    let bookPages = formData.get("pages")
    let bookRead = formData.get("read")
    if(bookRead == null ){
      bookRead = false
    } else{
      bookRead = true
    }
  
    if (!bookTitle || !bookAuthor || !bookPages) {
      alert("Please fill out all fields.");
      return;
    }
  
    //Adding the new data into the array.
  
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead)
    console.log(bookTitle, bookAuthor, bookPages, bookRead);
  
    // Re display the books onto the page.
    displayBooks()
  
  
    form.reset()  
    newBookModal.style.display = 'none'
  } )