const express = require('express');
const router = express.Router();
// const skills = require('../source/data/skills.json');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    let obj = {};
    const Model = mongoose.model('skill');

    Model.find().then(items => {
        Object.assign(obj, {skills: items});
        res.render('pages/about', obj);
    });
});

router.post('/update', (req, res) => {
    const Model = mongoose.model('skill');
    let items = req.body;
    let isError = false;

    for (let group in items) {

        let skills = Object.keys(items[group]).map(key => ({name: key, value: items[group][key]}));

        Model.update({group: group}, {$set: {"skills": skills}}).then(
            () => {},
            e => {
                isError = true;
                res.json({status: e.message})
            }
        );
        if (isError) break;
    }

    if (!isError) {
        res.json({status: 'Умения успешно сохранены'});
    }
});

module.exports = router;