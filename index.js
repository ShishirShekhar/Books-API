const { response } = require("express");
const express = require("express");
const { request } = require("http");
const { join } = require("path");

// Import database
const Database = require("./database");

// Initialization
const OurApp = express();

OurApp.use(express.json())

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

// Route    - /book/new
// Des      - to add new books
// Access   - Public
// Method   - POST
// Params   - none

OurApp.post("/book/new", (request, response) => {
    response.json({message: "Book added successfully"})
});

// Route    - /authors/new
// Des      - to add new author
// Access   - Public
// Method   - POST
// Params   - none

OurApp.post("/authors/new", (request, response) => {
    response.json({message: "Author added successfully"})
});

// Route    - /publication/new
// Des      - to add new publication
// Access   - Public
// Method   - POST
// Params   - none

OurApp.post("/publication/new", (request, response) => {
    response.json({message: "publication added successfully"})
});

/* ------------------------ PUT APIs -------------------------- */

// Route    - /book/update/:isbn
// Des      - update book details
// Access   - Public
// Method   - PUT
// Params   - isbn

OurApp.put("/book/update/:isbn", (request, response) => {
    const updatedBook = request.body;

    Database.Book.map((book) => {
        if (book.ISBN === request.params.isbn) {
            book.title = updatedBook.title;
            book.authors = updatedBook.authors;
            book.language = updatedBook.language;
            book.pubDate = updatedBook.pubDate;
            book.numOfPage = updatedBook.numOfPage;
            book.category = updatedBook.category;
            book.publication = updatedBook.publication;
        }
    });
    response.json({ message: Database.Book });
});

// Route    - /book/updateAuthour/:isbn
// Des      - to update/add new author
// Access   - Public
// Method   - PUT
// Params   - isbn

OurApp.put("/book/updateAuthour/:isbn", (request, response) => {
    const newAuthor = parseInt(request.body.author);
    const isbn = request.params.isbn;

    Database.Book.map((book) => {
        if (book.ISBN === isbn) {
           if (!book.authors.includes(newAuthor)) {
                book.authors.push(newAuthor);
           }
        }
    });

    Database.Author.map((author) => {
        if (author.id == newAuthor) {
            if (!author.book.includes(isbn)) {
                author.book.push(isbn);
            }
        }
    });

    response.json({ book: Database.Book, author: Database.Author });
});

// Route    - /authors/update/:id
// Des      - update author details
// Access   - Public
// Method   - PUT
// Params   - id

OurApp.put("/authors/update/:id", (request, response) => {

    const updatedDetails = request.body;
    
    Database.Author.map((author) => {
        if (author.id == request.params.id) {
            author.name = updatedDetails.name;
            author.books = updatedDetails.books;
        }
    });

    response.json({ message: Database.Author })
});

// Route    - /publication/update/:id
// Des      - update publication
// Access   - Public
// Method   - PUT
// Params   - id

OurApp.put("/publication/update/:id", (request, response) => {

    const updatedDetails = request.body;
    
    Database.Publication.map((pub) => {
        if (pub.id == request.params.id) {
            pub.name = updatedDetails.name;
            pub.books = updatedDetails.books;
        }
    });
    response.json({ message: Database.Publication });
});

// Route    - /publication/updateBook/:id
// Des      - to update/add new book
// Access   - Public
// Method   - PUT
// Params   - id

OurApp.put("/publication/updateBook/:id", (request, response) => {

    const book_ = request.body.books;

    Database.Publication.map((pub) => {
        if (pub.id == request.params.id) {
            if (!pub.books.includes(book_)){
                pub.books.push(book_);
            }
        }
    });

    Database.Book.map((book) => {
        if (book.ISBN === book_) {
            book.publication = request.params.id;
        }
    });
    response.json({ pub: Database.Publication, book: Database.Book });
});

/* ------------------------ DELETE APIs -------------------------- */


// Hosting
OurApp.listen(5000, () => console.log("Server is running"));