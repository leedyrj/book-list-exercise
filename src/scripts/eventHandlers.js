//creates buttons and input form.

//require jquery & apiController & domBuilder
const $ = require("jquery")
const apiController = require("./apiController")
const domBuilder = require("./domBuilder")

const formSection = $("<section>").attr("id", "form-section").prependTo("#container")

//create New Book and Save Book buttons
const newBookButton = $("<button>").attr("id", "new-book-button").addClass("button").text("New Book").appendTo(formSection)
const saveBookButton = $("<button>").attr("id", "save-book-button").addClass("button").text("Save Book")

//create div for input fields and append to main container
const inputDiv = $("<div>").attr("id", "input-div").appendTo(formSection)

//create input fields
const bookTitleInput = $("<input>")
    .attr("id", "book-title-input")
    .addClass("input")
    .attr("placeholder", "Book Title")

const bookSummaryInput = $("<input>")
    .attr("id", "book-summary-input")
    .addClass("input")
    .attr("placeholder", "Book Summary")

const bookPagesInput = $("<input>")
    .attr("id", "book-pages-input")
    .addClass("input")
    .attr("placeholder", "Number of Pages")

//click function to show input fields and save button and hide new book when button is clicked
newBookButton.click(() => {
    bookTitleInput.appendTo(inputDiv)
    bookSummaryInput.appendTo(inputDiv)
    bookPagesInput.appendTo(inputDiv)
    saveBookButton.show()
    saveBookButton.appendTo(formSection)
    newBookButton.hide()
    inputDiv.show()
})

//click funtion to save input to database, clear and hide input fields and show  new book
saveBookButton.click(() => {
    if (bookTitleInput.val() === "" || bookSummaryInput.val() === "" || bookPagesInput.val() === "") {
        alert("Please complete all fields!")
    } else {
        apiController.addNewBook($("#book-title-input").val(), $("#book-summary-input").val(), $("#book-pages-input").val())

        newBookButton.show()
        saveBookButton.hide()
        inputDiv.hide()

        bookTitleInput.val("")
        bookSummaryInput.val("")
        bookPagesInput.val("")
    }
    $("#card-container").empty();
    domBuilder.printer()
})

$("#container").change(event => {
    const boxChecked = $(event.target);
    if(event.target.className === "checkbox") {
        console.log("Winner!!")
    }
})

$("#container").click(event => {
    if(event.target.className === "button delete-book-button"){
        apiController.deleteBook(event.target.parentNode.id)
        .then((response) => {
            $("#card-container").empty()
            domBuilder.printer()
        })
    }
})

