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

//event listener listens for change on checkbox. if checked, changes read to true
$("#container").change(event => {
    if (event.target.className === "checkbox") {
        apiController.readBook(event.target.parentNode.id)
            .then((response) => {
                if (response.read === "true") {
                    let clearCard = event.target.parentNode
                    clearCard.style.display = "none"
                }
            })
    }
})

//listens for click on title and builds a form to edit
$("#container").click(event => {
    console.log(event.target.children)
    if (event.target.className === "book-title-heading" && event.target.children.length === 0) {
        const editTitleInput = $("<input>")
            .attr("id", "edit-title-input")
            .attr("value", event.target.textContent)
            .addClass("input")
            .appendTo(event.target)

        const editSummaryInput = $("<input>")
            .attr("id", "edit-summary-input")
            .attr("value", event.target.nextSibling.textContent)
            .addClass("input")
            .appendTo(event.target.nextSibling)

        const editPagesInput = $("<input>")
            .attr("id", "edit-pages-input")
            .attr("value", event.target.nextSibling.nextSibling.textContent)
            .addClass("input")
            .appendTo(event.target.nextSibling.nextSibling)

        //listens for enter to be pressed, takes values from above form and calls editBook with them.  clears and rewrites dom
        $(document).unbind("keypress").keypress(function (e) {
            if (e.which === 13) {
                editTitle = editTitleInput.val()
                editSummary = editSummaryInput.val()
                editPages = editPagesInput.val()
                apiController.editBook(event.target.parentNode.id, editTitle, editSummary, editPages)
                    .then((response) => {
                        $("#card-container").empty();
                        domBuilder.printer()
                    })
            }
        });
    }
})

//event listener on delte button.  calls deletebook from api and clears and rewrites dom
$("#container").click(event => {
    if (event.target.className === "button delete-book-button") {
        apiController.deleteBook(event.target.parentNode.id)
            .then((response) => {
                $("#card-container").empty()
                domBuilder.printer()
            })
    }
})


