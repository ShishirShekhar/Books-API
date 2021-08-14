/*
Requirements

Book
    - ISBN          - String
    - Title         - String
    - Author        - [Numbers]
    - Language      - String
    - Publications  - Numbers
    - NumOfPages    - Numbers
    - Categories    - [String]

Author
    - Id    - Number
    - Name  - String
    - Books - [Strings]

Publication
    - Id    - Number
    - Name  - String
    - Books - [Strings]

--------------------------- APIs -----------------------------

Book
    - GET
        - to get all books ✅
        - to get specific book ✅
        - to get a list of books based on category ✅
        - to get a list of books based on author ✅

    - POST
        - to add new books

    - PUT
        - update book details
        - to update/add new author

    - DELETE
        - delete a book
        - delete an author from the book

Author
    - GET
        - to get all authors
        - to get specific author
        - to get list of author based on a book

    - POST
        - to add new author

    - PUT
        - update author details

    - DELETE
        - delete an author

Publication
    - GET
        - to get all publication
        - to get specific publication
        - to get a list of publication based on a book.

    - POST
        - Add a new publication

    - PUT
        - update publication
        - to update/add new book

    - DELETE
        - delete a book from publication
        - delete a publication

*/