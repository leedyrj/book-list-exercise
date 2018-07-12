//calls get book list from API and prints it to the dom.  Exports printer function to be used when a new book is saved

//require jquery & apiController
const $ = require("jquery")
const apiController = require("./apiController")

const cardContainer = $("<div>").attr("id", "card-container").appendTo("#container")

const printDom = Object.create({}, {
    printer: {
        value: function () {
            cardContainer.empty()
            apiController.getBookList().then((bookList) => {
                bookList.forEach(books => {
                    //checks to see if the book has been read and only prints ones that are read: false
                    if (books.read === "false") {
                        //creates a card and assigns html tags to fields
                        const bookCard = $(`<div id=${books.id}>`)
                        const bookTitle = $("<h2>").text(books.title).addClass("book-title-heading")
                        const bookSummary = $("<h4>").text(books.summary).addClass("book-summary-heading")
                        const bookPages = $("<p>").text(`p. ${books.pages}`).addClass("book-pages-para")

                        //creates and appends checkbox and delte button
                        const readCheckbox = $(`<input type='checkbox' id='read-checkbox-${books.id}'><label> Mark As Read </label>`).addClass("checkbox")

                        const deleteBookButton = $("<button>").addClass("button").addClass("delete-book-button").text("Delete Book")

                        //appends card to card container and fields to cards
                        bookCard.appendTo(cardContainer)

                        bookCard.append(bookTitle)
                            .append(bookSummary)
                            .append(bookPages)
                            .append(readCheckbox)
                            .append(deleteBookButton)
                    }
                });
            })
        }
    }
})

module.exports = printDom
