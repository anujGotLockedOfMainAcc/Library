let myLibrary = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
makeDiv();

// constructor to create book objects
function book(bookName, author, pages) {
  this.name = bookName;
  this.author = author;
  this.pages = pages;
  this.read = "Not Read";
}

// TO ADD BOOK TO THE myLib
function addBookToLibrary() {}

// form and getting data from the form
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents the default form submission behavior
  // gather form data
  let bookName = document.getElementById("book-name").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;

  //using data
  let bookk = new book(bookName, author, pages);
  myLibrary.push(bookk);
  // addBooks(bookk);
  hideForm();
  refreshForm();
  makeDiv();
  addBooks(bookk);
  // myLibrary.shift();
});

// form pop-up
let addBook = document.querySelector(".add-book");
addBook.addEventListener("click", () => {
  document.getElementById("form").style.display = "block";
});

// hide form
function hideForm() {
  document.getElementById("form").style.display = "none";
}

//make div
function makeDiv() {
  let main2 = document.querySelector(".main2");
  cleanDiv(main2);
  for (let i = 0; i < myLibrary.length; i++) {
    // creating div and its elements
    let div = document.createElement("div");
    let namd = document.createElement("h1");
    let authD = document.createElement("h1");
    let pageD = document.createElement("h1");
    let read = document.createElement("button");
    let remove = document.createElement("button");

    // addding value to that element
    namd.innerHTML = `${myLibrary[i].name}`;
    authD.innerHTML = `${myLibrary[i].author}`;
    pageD.innerHTML = `${myLibrary[i].pages}`;
    if (myLibrary[i].read === "Read") {
      read.style.backgroundColor = "#6b8e23";
    } else {
      read.style.backgroundColor = "#e2725b ";
    }
    read.innerHTML = `${myLibrary[i].read}`;
    remove.innerHTML = "Remove";

    // read.style.backgroundColor = "rgb(239, 92, 92)";
    // adding content to div, div to main2
    styleDiv(div, read, remove);
    div.appendChild(namd);
    div.appendChild(authD);
    div.appendChild(pageD);
    div.appendChild(read);
    div.appendChild(remove);
    // adding remove and read functionality
    remove.addEventListener("click", () => {
      update(div, i);
    });
    read.addEventListener("click", () => {
      if (myLibrary[i].read === "Not Read") {
        console.log("hi");
        read.style.backgroundColor = "#6b8e23";
        read.innerHTML = "Read";
        myLibrary[i].read = "Read";
        localStorage.setItem("items", JSON.stringify(myLibrary));
      } else {
        console.log("hi");
        read.style.backgroundColor = "#e2725b";
        read.innerHTML = "Not Read";
        myLibrary[i].read = "Not Read";
        localStorage.setItem("items", JSON.stringify(myLibrary));
      }
    });

    main2.appendChild(div);
  }
}

// to dull the background
let add = document.querySelector("#add");
let dullBackground = document.querySelector(".dull-background");

addBook.addEventListener("click", () => {
  dullBackground.classList.add("active");
});

add.addEventListener("click", () => {
  dullBackground.classList.remove("active");
});

// function to refresh the form
function refreshForm() {
  let form = document.querySelector("#form");
  document.getElementById("book-name").value = null;
  document.getElementById("author").value = null;
  document.getElementById("pages").value = null;
}

// function to style the div
function styleDiv(div, read, remove) {
  div.classList.add("added");
  read.classList.add("style-button");
  remove.classList.add("style-button");
}

//  function to add book to local storage
function addBooks(book) {
  localStorage.setItem("items", JSON.stringify(myLibrary));
}

//function to remove book
function update(div, i) {
  div.remove();
  myLibrary.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(myLibrary));
}

function cleanDiv(main2) {
  while (main2.firstChild) {
    main2.removeChild(main2.firstChild);
  }
}
