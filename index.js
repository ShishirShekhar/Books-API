const { response } = require("express");
const express = require("express");
const { request } = require("http");

// Import database
const Database = require("./database");

// Initialization
const OurApp = express();

OurApp.get("/", (request, response) => {
    response.json({ message: "Server is working!!!"})
});

// Route    - /book
// Des      - to get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurApp.get("/book", (request, response) => {
    response.json({ books: Database.Book })
});

// Route    - /book/:BookID
// Des      - to get specific book
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
OurApp.get("/book/:bookID", (request, response) => {
    const getBook = Database.Book.filter(
        (book) => book.ISBN == request.params.bookID
    );
    
    response.json({ book: getBook })
});

// Route    - /book/cat/category
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none
OurApp.get("/book/cat/:category", (request, response) => {
    const getBook = Database.Book.filter(
        (book) => book.category.includes(request.params.category)
    );
    
    response.json({ book: getBook })
});

// Route    - /book/aut/author
// Des      - to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none
OurApp.get("/book/aut/:author", (request, response) => {
    const getBook = Database.Book.filter(
        (book) => book.authors.includes(parseInt(request.params.author))
    );
    
    response.json({ book: getBook })
});


OurApp.listen(5000, () => console.log("Server is running"));