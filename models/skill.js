'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SkillSchema = new Schema({
    group: {
        type: String,
        required: [true, 'Укажите группу']
    },
    skills: [{
        name: {
            type: String,
            required: [true, 'Укажите название']
        },
        value: {
            type: Number,
            min: 0,
            max: 100,
            required: [true, 'Укажите значение']
        }
    }]
});

mongoose.model('skill', SkillSchema);