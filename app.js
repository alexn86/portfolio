'use strict';

const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = http.createServer(app);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const root = require('./gulp/config').root;
const config = require('./config.json');
const uploadDir = config.uploadDir;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
//     user: config.db.user,
//     pass: config.db.password
// }).catch(e => {
//     console.error(e);
//     throw e;
// });

mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`);

//подключаем модели(сущности, описывающие коллекции базы данных)
require('./models/post');
require('./models/work');
require('./models/skill');
require('./models/user');

// view engine setup
//app.set('views', path.join(__dirname, './source/template/'));
app.set('views', path.join(__dirname, './views/'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, root)));
app.use(session({
    secret: 'secret',
    key: 'keys',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use('/', require('./routes/index'));
app.use('/works', require('./routes/works'));
app.use('/works/add', require('./routes/works'));
app.use('/about', require('./routes/about'));
app.use('/blog', require('./routes/blog'));
app.use('/blog/add', require('./routes/blog'));
app.use('/admin', require('./routes/admin'));
app.use('/contact', require('./routes/mail'));
app.use('/login', require('./routes/login'));

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    let obj = {};

    // console.log(req, res);
    obj.error = new Error('Ошибка 404');
    res
        .status(404)
        .render('pages/error', obj);
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    let obj = {};

    obj.error = new Error('Ошибка 500');
    console.error(err.stack);
    res
        .status(500)
        .render('pages/error', obj);
});

server.listen(3000, 'localhost');
server.on('listening', function () {
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});
