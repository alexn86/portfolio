const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const skills = require('../source/data/skills.json');
const posts = require('../source/data/posts.json');
const works = require('../source/data/works.json');

const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том, что он является
    // администратором
    if (req.session.isAdmin) {
        //то всё хорошо :)
        return next();
    }
    //если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/');
};

router.get('/', isAdmin, function (req, res) {
    let obj = {};
    const Model = mongoose.model('skill');

    Model.find().then(items => {
        // Object.assign(obj, skills);
        Object.assign(obj, {skills: items});
        Object.assign(obj, posts);
        Object.assign(obj, works);
        res.render('pages/admin', obj);
    });
});

module.exports = router;