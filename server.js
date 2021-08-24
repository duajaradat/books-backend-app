'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT;

const server = express();
server.use(cors());


//books database
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

//Schema 
const bookSchema = new mongoose.Schema({
    books: [{
        title: String,
        description: String,
    }],
    email: String,
});

//Model 
const BooksModel = mongoose.model('Books', bookSchema);

function seedDataCollection() {
    const emailYahoo = new BooksModel({
        email: "duajaradat164@yahoo.com",
        books: [
            {
                title: "Idiot Brain",
                description: "Explains What Your Head is Really Up To",
                status: "success",
            },
            {
                title: "Happy Brain",
                description: "investigate what causes happiness, where it comes from, and why we are so desperate to hang onto it.",
                status: "success",
            }

        ]

    })

    const emailGmail = new BooksModel({
        email: "duajaradat164@gmail.com",
        books: [{
            title: "The Da Vinci Code",
            description: "mystery thriller novel.",
            status: "complete"
        }]

    })
    emailYahoo.save();
    emailGmail.save();

}
// seedDataCollection();

//localhost:3001/books?email=duajaradat164@gmail.com
server.get('/books', getBooksHandler);
function getBooksHandler(req, res) {
    let emailAdress = req.query.email;
    // console.log(emailAdress);
    BooksModel.find({ email: emailAdress }, function (err, resultData) {
        if (err) {
            console.log('There is no Data for the email address: ' + emailAdress);
        } else {
            console.log("yyyyyyyyyyyyyyyy", resultData[0].books);
            res.send(resultData[0].books);
        }
    })
}

//listening on
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);

})


