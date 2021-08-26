// Import required modules

const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

// Import Schema's
const BookModel = require("./schema/book");
const AuthorModel = require("./schema/author");
const PublicationModel = require("./schema/publication");

// Import database
const Database = require("./database");

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("connection extablished!"))
 .catch((error) => console.log(error));

// Initialization
const OurApp = express();

OurApp.use(express.json())

OurApp.get("/", (request, response) => {
    return response.json({ message: "Server is working!!!"})
});

/* ------------------------ GET APIs -------------------------- */

// Route    - /book
// Des      - to get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

OurApp.get("/book", async (request, response) => {
    const getAllBooks = await BookModel.find();
    return response.json(getAllBooks);
});

// Route    - /book/:BookID
// Des      - to get specific book
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none

OurApp.get("/book/:bookID", async (request, response) => {
    const getSpecificBook = await BookModel.findOne({ISBN: request.params.bookID});

    if (!getSpecificBook) {
        return response.json({
            error: `No book found for the ISBN of ${request.params.bookID}`
    });
    }

    return response.json(getSpecificBook);
});

// Route    - /book/cat/:category
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none

OurApp.get("/book/cat/:category", async (request, response) => {
    const getSpecificBook = await BookModel.findOne({category: request.params.category});

    if (!getSpecificBook) {
        return response.json({
            error: `No book found for the category of ${request.params.category}`
    });
    }

    return response.json(getSpecificBook);
});

// Route    - /book/aut/:author
// Des      - to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

OurApp.get("/book/aut/:author", async (request, response) => {
    const getSpecificBook = await BookModel.findOne({authors: parseInt(request.params.author)});

    if (!getSpecificBook) {
        return response.json({
            error: `No book found for the author of ${parseInt(request.params.author)}`
    });
    }

    return response.json(getSpecificBook);
});

// Route    - /authors
// Des      - to get all authors
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

OurApp.get("/authors", async (request, response) => {
    const getAllAuthors = await AuthorModel.find();
    return response.json(getAllAuthors);
});

// Route    - /authors/aut/:author_
// Des      - to get specific author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

OurApp.get("/authors/aut/:author_", async (request, response) => {
    const getSpecificAuthor = await AuthorModel.findOne({id: parseInt(request.params.author_)});

    if (!getSpecificAuthor) {
        return response.json({
            error: `No author found for the id of ${parseInt(request.params.author_)}`
    });
    }

    return response.json(getSpecificAuthor);
});

// Route    - /authors/book/:book
// Des      - to get list of author based on a book
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none

OurApp.get("/authors/book/:book", async (request, response) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: request.params.book});

    if (!getSpecificAuthor) {
        return response.json({
            error: `No author found for the book ${request.params.book}`
    });
    }

    return response.json(getSpecificAuthor);
});

// Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none

OurApp.get("/publication", async (request, response) => {
    const getAllPublication = await PublicationModel.find();
    return response.json(getAllPublication);
});

// Route    - /publication/pub/:pub_
// Des      - to get specific publication
// Access   - Public
// Method   - GET
// Params   - publication
// Body     - none

OurApp.get("/publication/pub/:pub_", async (request, response) => {
    const getSpecificPublication = await PublicationModel.findOne({id: parseInt(request.params.pub_)});

    if (!getSpecificPublication) {
        return response.json({
            error: `No publication found for the id of ${parseInt(request.params.pub_)}`
    });
    }

    return response.json(getSpecificPublication);
});

// Route    - /publication/book/:book_
// Des      - to get a list of publication based on a book
// Access   - Public
// Method   - GET
// Params   - book
// Body     - none

OurApp.get("/publication/book/:book_", async (request, response) => {
    const getSpecificPublication = await PublicationModel.findOne({books: request.params.book_});

    if (!getSpecificPublication) {
        return response.json({
            error: `No publication found for the book ${request.params.book_}`
    });
    }

    return response.json(getSpecificPublication);
});

/* ------------------------ POST APIs -------------------------- */

// Route    - /book/new
// Des      - to add new books
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newBook : { details } }

OurApp.post("/book/new", (request, response) => {
    try {
        const { newBook } = request.body;

        BookModel.create(newBook);
        return response.json({ message: "Book added to the database" });
    }
    catch(error) {
        return response.json({ error: error.message });
    }
});

// Route    - /authors/new
// Des      - to add new author
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newAuthor: { details } }

OurApp.post("/authors/new", (request, response) => {
    try {
        const { newAuthor } = request.body;

        AuthorModel.create(newAuthor);
        return response.json({ message: "Author added to the database" });
    }
    catch(error) {
        return response.json({ error: error.message });
    }
});

// Route    - /publication/new
// Des      - to add new publication
// Access   - Public
// Method   - POST
// Params   - none
// Body     - { newPublication: { details } }

OurApp.post("/publication/new", (request, response) => {
    try {
        const { newPublication } = request.body;

        PublicationModel.create(newPublication);
        return response.json({ message: "Publication added to the database" });
    }
    catch(error) {
        return response.json({ error: error.message });
    }
});

/* ------------------------ PUT APIs -------------------------- */

// Route    - /book/update/:isbn
// Des      - update book details
// Access   - Public
// Method   - PUT
// Params   - isbn
// Body     - { title: newTtile }

OurApp.put("/book/update/:isbn", async (request, response) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: request.params.isbn },
        { title: request.body.title },
        { new: true }
    );

    return response.json(updatedBook);
});

// Route    - /book/updateAuthour/:isbn
// Des      - to update/add new author
// Access   - Public
// Method   - PUT
// Params   - isbn
// Body     - { "newAuthor": id }

OurApp.put("/book/updateAuthour/:isbn", async (request, response) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: request.params.isbn },
        { $addToSet: { authors: request.body.newAuthor } },
        { new: true }
    );

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: request.body.newAuthor },
        { $addToSet: { books: request.params.isbn } },
        { new: true }
    );

    return response.json({ book: updatedBook, author: updatedAuthor });
});

// Route    - /authors/update/:id
// Des      - update author details
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "name": { newName } }

OurApp.put("/authors/update/:id", async (request, response) => {
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: parseInt(request.params.id) },
        { name: request.body.name },
        { new: true }
    );

    return response.json(updatedAuthor);
});

// Route    - /publication/update/:id
// Des      - update publication
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "name": { newName } }

OurApp.put("/publication/update/:id", async (request, response) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: parseInt(request.params.id) },
        { name: request.body.name },
        { new: true }
    );

    return response.json(updatedPublication);
});

// Route    - /publication/updateBook/:id
// Des      - to update/add new book
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - { "book": ISBN }

OurApp.put("/publication/updateBook/:id", async (request, response) => {
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: parseInt(request.params.id) },
        { $addToSet: { books: request.body.book } },
        { new: true }
    );
    
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: request.body.book },
        { publication: parseInt(request.params.id) },
        { new: true }
    );

    return response.json({ publication: updatedPublication, book: updatedBook });
});

/* ------------------------ DELETE APIs -------------------------- */

// Route    - /book/deleteBook/:BookID
// Des      - to get specific book
// Access   - Public
// Method   - DELETE
// Params   - bookID
// Body     - none

OurApp.delete("/book/deleteBook/:BookID", async (request, response) => {
    const updatedBook = await BookModel.findOneAndDelete( 
        { ISBN: request.params.BookID }
    );

    return response.json({ books: updatedBook });
});

// Route    - /book/deleteAuthor/:BookID/:authorID
// Des      - delete an author from the book
// Access   - Public
// Method   - DELETE
// Params   - bookID, authorID
// Body     - none

OurApp.delete("/book/deleteAuthor/:BookID/:authorID", async (request, response) => {
    const isbn = request.params.BookID;
    const author_ = parseInt(request.params.authorID);

    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: isbn },
        { $pull: { authors: author_ } },
        { new: true }
    );

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: author_ },
        { $pull: { books: isbn } },
        { new: true }
    );

    return response.json({ book: updatedBook, author: updatedAuthor });
});

// Route    - /author/delete/:authorID
// Des      - delete an author
// Access   - Public
// Method   - DELETE
// Params   - authorID
// Body     - none

OurApp.delete("/author/delete/:authorID", async (request, response) => {
    const updatedAuthor = await AuthorModel.findOneAndDelete( 
        { id: parseInt(request.params.authorID) }
    );

    return response.json({ authros: updatedAuthor });
});

// Route    - /publication/delete/:publicationId
// Des      - delete a publication
// Access   - Public
// Method   - DELETE
// Params   - publicationID
// Body     - none

OurApp.delete("/publication/delete/:publicationId", async (request, response) => {
    const updatedPublication = await PublicationModel.findOneAndDelete( 
        { id: parseInt(request.params.publicationId) }
    );

    return response.json({ publications: updatedPublication });
});

// Route    - /publication/deleteBook/:publicationId/:bookId
// Des      - delete a book from publication
// Access   - Public
// Method   - DELETE
// Params   - publicationID, bookID
// Body     - none

OurApp.delete("/publication/deleteBook/:publicationId/:bookId", async (request, response) => {
    const id = parseInt(request.params.publicationId);
    const isbn = request.params.bookId;

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: id },
        { $pull: { books: isbn } },
        { new: true }
    );

    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: isbn },
        { publication: -1 },
        { new: true }
    );

    response.json({ publication: updatedPublication, book: updatedBook })
});

// Hosting
OurApp.listen(5000, () => console.log("Server is running"));