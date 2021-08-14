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

OurApp.get("/book", (request, response) => {
    response.json({ books: Database.Book })
});

OurApp.listen(5000, () => console.log("Server is running"));