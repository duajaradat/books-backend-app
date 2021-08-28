const { BooksModel } = require('./books.mdel')

//GET
function getBooksHandler(req, res) {
    let emailAdress = req.query.email;
    // console.log(emailAdress);
    BooksModel.find({ email: emailAdress }, function (err, resultData) {
        if (err) {
            console.log('There is no Data for the email address: ' + emailAdress);
        } else {
            // console.log("yyyyyyyyyyyyyyyy", resultData);
            res.send(resultData);
        }
    })
}



//POST(create)
async function addBookHandler(req, res) {
    console.log('addBook');
    console.log(req.body);
    // let { email, title, description, status } = req.body;
    const newBook = new BooksModel(
        req.body
    )
    await newBook.save();
    BooksModel.find({ email: req.body.email }, function (err, resultData) {
        if (err) {
            console.log('There is no Data for the email address: ' + req.body.email);
        } else {
            // console.log("yyyyyyyyyyyyyyyy", resultData);
            res.send(resultData);
        }
    })
}

//DELETE
async function deleteBookHandler(req, res) {
    let email = req.query.email;
    let bookDataId = req.params.bookId;
    console.log("delete book", bookDataId);

    BooksModel.deleteOne({ _id: req.params.bookId }, function (err, resultData) {
        if (err) {
            console.log('ERROR')
        } else {
            console.log(resultData);
            BooksModel.find({ email: req.query.email }, function (err, resultData) {
                if (err) {
                    console.log('There is no Data for the email address: ' + req.body.email);
                } else {
                    res.send(resultData);
                }
            })
        }
    })
}

module.exports = { getBooksHandler, addBookHandler, deleteBookHandler }