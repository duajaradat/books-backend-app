const mongoose = require('mongoose');


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

// seedDataCollection();


module.exports = { BooksModel }
