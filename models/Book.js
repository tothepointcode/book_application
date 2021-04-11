const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookTitle: String,
    authorName: String,
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;