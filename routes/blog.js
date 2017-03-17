const express = require('express');
const router = express.Router();
// const posts = require('../source/data/posts.json');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    let obj = {};

    // Object.assign(obj, posts);
    // res.render('pages/blog', obj);

    const Model = mongoose.model('post');

    Model.find().then(items => {
        let postsNav = items.map(item => ({name: item.title}));

        Object.assign(obj, {posts: items});
        Object.assign(obj, {postsNav: postsNav});
        res.render('pages/blog', obj);
    });
});

router.post('/add', function (req, res) {
    if (!req.body.name || !req.body.date || !req.body.text) {
        //если что-либо не указано - сообщаем об этом
        return res.json({status: 'Укажите данные!'});
    }

    const Model = mongoose.model('post');
    let item = new Model({title: req.body.name, date: req.body.date, body: req.body.text});

    item.save().then(
        () => res.json({status: 'Запись успешно добавлена'}),
        (e) => {
            const error = Object
                .keys(e.errors)
                .map(key => e.errors[key].message)
                .join(', ');
            res.json({status: 'При добавление записи произошла ошибка: ' + error});
        }
    );
});

module.exports = router;