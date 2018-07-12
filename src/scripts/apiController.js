//contains all API functions

const $ = require("jquery")

const apiController = Object.create({}, {
    //function to add new book
    addNewBook: {
        value: function (title, summary, pages) {
            return $.ajax({
                url: "http://localhost:3000/books",
                type: "POST",
                data: {
                    title: title,
                    summary: summary,
                    pages: pages,
                    read: false
                }
            })
        }
    },
    //function to get entire list of books currently in database
    getBookList: {
        value: function () {
            return $.ajax("http://localhost:3000/books")
        }
    },
    //function to change if a book has been read when checkbox is clicked
    readBook: {
        value: function (editedId) {
            return $.ajax({
                url: `http://localhost:3000/books/${editedId}`,
                type: "PATCH",
                data: {
                    read: true
                }
            })
        }
    },
    //funtion to edit book and replace current values with new
    editBook: {
        value: function (editId, title, summary, pages) {
            return $.ajax({
                url: `http://localhost:3000/books/${editId}`,
                type: "PATCH",
                data: {
                    title: title,
                    summary: summary,
                    pages: pages
                }
            });
        }
    },
    //function to delete a book from the database
    deleteBook: {
        value: function (id) {
            return $.ajax({
                url: `http://localhost:3000/books/${id}`,
                type: "DELETE"
            })
        }
    }
})

module.exports = apiController