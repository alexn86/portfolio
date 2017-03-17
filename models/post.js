'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Укажите заголовок статьи']
    },
    date: {
        type: String,
        required: [true, 'Укажите дату публикации']
    },
    body: {
        type: String,
        required: [true, 'Укажите содержимое статьи']
    }
});

mongoose.model('post', BlogSchema);