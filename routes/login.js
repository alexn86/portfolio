const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

//при получении post-запроса по адресу /login
router.post('/', (req, res) => {
    //требуем наличия логина и пароля в теле запроса
    if (!req.body.login || !req.body.password) {
        //если не указан логин или пароль - сообщаем об этом
        return res.json({status: 'Укажите логин и пароль!'});
    }

    if (!req.body.human || !req.body.answer || req.body.answer == "no") {
        return res.json({status: 'Роботам здесь не место!'});
    }

    //получаем модель пользователя и шифруем введенный пароль
    const Model = mongoose.model('user');
    const password = crypto.createHash('md5').update(req.body.password).digest('hex');

    //пытаемся найти пользователя с указанным логином и паролем
    Model.findOne({login: req.body.login, password: password}).then(item => {
        //если такой пользователь не найден - сообщаем об этом
        if (!item) {
            res.json({status: 'Логин и/или пароль введены неверно!'});
        } else {
            //если найден, то делаем пометку об этом в сессии пользователя, который сделал запрос
            req.session.isAdmin = true;
            res.json({status: 'Авторизация успешна!'});
        }
    });
});

module.exports = router;