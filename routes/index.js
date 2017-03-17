const express = require('express');
const router = express.Router();
// const article = require('../source/data/article');

router.get('/', function (req, res) {
    // let obj = {title: "Главная страница"};
    let obj = {};
    res.render('pages/index', obj);
});

module.exports = router;