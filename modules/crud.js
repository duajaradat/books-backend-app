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

function updateBookHandler(req, res) {
    const { email, title, description } = req.body;
    const bookID = req.params.bookId;
    console.log("yala")
    BooksModel.findOne({ _id: bookID }, function (err, resultData) {
        resultData.email = email;
        resultData.title = title;
        resultData.description = description;
        resultData.save()
            .then(() => {
                BooksModel.find({ email }, function (err, resultData) {
                    if (err) {
                        console.log('ERROR');
                    } else {
                        res.send(resultData);
                    }
                })
            }).catch(error => {
                console.log('Error in saving')
            })

    })


}



// mongodb://duajaradat:0000@duadatabases-shard-00-00.y86nh.mongodb.net:27017,duadatabases-shard-00-01.y86nh.mongodb.net:27017,duadatabases-shard-00-02.y86nh.mongodb.net:27017/bookappdata?ssl=true&replicaSet=atlas-5gulo3-shard-0&authSource=admin&retryWrites=true&w=majority
module.exports = { getBooksHandler, addBookHandler, deleteBookHandler, updateBookHandler }