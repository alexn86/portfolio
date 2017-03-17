const express = require('express');
const router = express.Router();
// const works = require('../source/data/works.json');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    let obj = {};
    const Model = mongoose.model('work');

    Model.find().then(items => {
        Object.assign(obj, {works: items});
        res.render('pages/works', obj);
    });
});

router.post('/add', function (req, res) {
    let form = new formidable.IncomingForm();

    form.uploadDir = config.uploadDir;
    form.parse(req, function (err, fields, files) {
        if (err) {
            //res.statusCode = 500;
            return res.json({status: 'Не удалось добавить работу'});
        }

        const Model = mongoose.model('work');

        fs
            .rename(files.photo.path, path.join(config.uploadDir, files.photo.name), function (err) {
                if (err) {
                    fs.unlink(path.join(config.upload, files.photo.name));
                    fs.rename(files.photo.path, files.photo.name);
                }

                let dir = config.uploadDir.substr(config.uploadDir.indexOf('/'));

                const item = new Model({
                    name: fields.name,
                    tech: fields.tech,
                    image: path.join(dir, files.photo.name),
                    link: fields.link
                });

                item.save().then(() => {
                    res.json({status: 'Работа успешно добавлена'});
                });
            });
    });
});

module.exports = router;