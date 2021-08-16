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

/* ------------------------ GET APIs -------------------------- */

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

// Route    - /authors
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurApp.get("/authors", (request, response) => {
    response.json({ authors: Database.Author })
});

// Route    - /authors/aut/:author_
// Des      - to get specific author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none
OurApp.get("/authors/aut/:author_", (request, response) => {
    const getAuthor = Database.Author.filter(
        (author) => author.id == parseInt(request.params.author_)
    );
    
    response.json({ book: getAuthor })
});

// Route    - /authors/book/:book
// Des      - to get list of author based on a book
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none
OurApp.get("/authors/book/:book", (request, response) => {
    const getAuthor = Database.Author.filter(
        (author) => author.books.includes(request.params.book)
    );
    
    response.json({ book: getAuthor })
});

// Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurApp.get("/publication", (request, response) => {
    response.json({ publications: Database.Publication })
});

// Route    - /publication/pub/:pub_
// Des      - to get specific publication
// Access   - Public
// Method   - GET
// Params   - publication
// Body     - none
OurApp.get("/publication/pub/:pub_", (request, response) => {
    const getPublication = Database.Publication.filter(
        (pub) => pub.id == parseInt(request.params.pub_)
    );
    
    response.json({ book: getPublication })
});

// Route    - /publication/book/:book_
// Des      - to get a list of publication based on a book
// Access   - Public
// Method   - GET
// Params   - book
// Body     - none
OurApp.get("/publication/book/:book_", (request, response) => {
    const getPublication = Database.Publication.filter(
        (pub) => pub.books.includes(request.params.book_)
    );
    
    response.json({ book: getPublication })
});

/* ------------------------ POST APIs -------------------------- */
/* ------------------------ PUT APIs -------------------------- */
/* ------------------------ DELETE APIs -------------------------- */


// Hosting
OurApp.listen(5000, () => console.log("Server is running"));