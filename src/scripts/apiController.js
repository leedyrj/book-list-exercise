//contains all API functions

const $ = require("jquery")

const apiController = Object.create({}, {
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
    getBookList: {
        value: function () {
            return $.ajax("http://localhost:3000/books")
        }
    },
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