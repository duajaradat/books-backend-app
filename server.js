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
const { getBooksHandler, addBookHandler, deleteBookHandler } = require('./modules/crud')
//books database
mongoose.connect(`${process.env.MONGODB_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });

//localhost:3001/books?email=duajaradat164@gmail.com
server.get('/books', getBooksHandler);



//localhost:3001/addbook?email={user.email}
server.post('/addbook', addBookHandler);

//localhost:3001/deletebook/:bookId/${bookID}?email=userEmail
server.delete('/deletebook/:bookId', deleteBookHandler);


//listening on
server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);


})


