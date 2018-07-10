//contains all API functions

const $ = require("jquery")

const apiController = Object.create({}, {
    addNewBook:{
        value: function(title, summary, pages) {
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
        value: function() {
            return $.ajax("http://localhost:3000/books")
        }
    },
    editBook:{
        value: function(editedbook, editId) {
            return $.ajax({
                url: `https://localhost:3000/books/${editId}`,
                type: "PUT",
                data: {
                    title: title,
                    summary: summary,
                    pages: pages,
                    read: false
                }
            });
        }
    },
    deleteBook:{
        value: function(id) {
            return $.ajax({
                url: `http://localhost:3000/books/${id}`,
                type: "DELETE"
            })
        }
    }
})

module.exports = apiController