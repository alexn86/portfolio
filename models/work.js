'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Укажите заголовок статьи']
    },
    tech: {
        type: String,
        required: [true, 'Укажите технологии']
    },
    image: {
        type: String,
        required: [true, 'Укажите изображение']
    },
    link: {
        type: String
    }
});

mongoose.model('work', BlogSchema);