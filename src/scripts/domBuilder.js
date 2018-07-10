//calls get book list from API and prints it to the dom.  Exports printer function to be used when a new book is saved

//require jquery & apiController
const $ = require("jquery")
const apiController = require("./apiController")

const cardContainer = $("<div>").attr("id", "card-container").appendTo("#container")

const printDom = Object.create({}, {
    printer:{
        value: function() {
            apiController.getBookList().then((bookList) => {
                bookList.forEach(books => {
                    const bookCard = $(`<div id=${books.id}>`)
                    const bookTitle = $("<h2>").text(books.title)
                    const bookSummary = $("<h4>").text(books.summary)
                    const bookPages = $("<p>").text(`p. ${books.pages}`)

                    const readCheckbox = $(`<input type='checkbox' id='read-checkbox-${books.title}'><label> Read </label>`).addClass("checkbox")

                    const deleteBookButton = $("<button>").addClass("button").addClass("delete-book-button").text("Delete Book")

                    bookCard.appendTo(cardContainer)

                    bookCard.append(bookTitle)
                    .append(bookSummary)
                    .append(bookPages)
                    .append(readCheckbox)
                    .append(deleteBookButton)
                });
            })
        }
    }
})

module.exports = printDom
