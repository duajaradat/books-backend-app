'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { default: axios } = require('axios');
require('dotenv').config();

const PORT = process.env.PORT;

const server = express();
server.use(cors());
server.use(express.json());


//books database
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

//Schema 
const bookSchema = new mongoose.Schema({
    email: String,
    title: String,
    description: String,

});

//Model 
const BooksModel = mongoose.model('Books', bookSchema);

function seedDataCollection() {
    const emailYahoo = new BooksModel({
        email: "duajaradat164@yahoo.com",
        title: "Idiot Brain",
        description: "Explains What Your Head is Really Up To",
        status: "success",
    })
    const emailYahoo2 = new BooksModel({
        email: "duajaradat164@yahoo.com",
        title: "Happy Brain",
        description: "investigate what causes happiness, where it comes from, and why we are so desperate to hang onto it.",
        status: "success",
    })


    const emailGmail = new BooksModel({
        email: "duajaradat164@gmail.com",
        title: "The Da Vinci Code",
        description: "mystery thriller novel.",
        status: "complete"



    })
    emailYahoo.save();
    emailYahoo2.save();
    emailGmail.save();
}

seedDataCollection();

//localhost:3001/books?email=duajaradat164@gmail.com
server.get('/books', getBooksHandler);
function getBooksHandler(req, res) {
    let emailAdress = req.query.email;
    // console.log(emailAdress);
    BooksModel.find({ email: emailAdress }, function (err, resultData) {
        if (err) {
            console.log('There is no Data for the email address: ' + emailAdress);
        } else {
            console.log("yyyyyyyyyyyyyyyy", resultData);
            res.send(resultData);
        }
    })
}


//localhost:3001/addbook?email={user.email}
server.post('/addbook', addBookHandler);
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
            console.log("yyyyyyyyyyyyyyyy", resultData);
            res.send(resultData);
        }
    })
}

//listening on
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);


})


