'use strict';

function showModal(message) {
    let modal = $('.modal');

    modal.find('.modal__message').text(message);
    modal.css('visibility', 'visible');
}

function sendAjax(url, data, cb) {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.onload = function (e) {
        let result = JSON.parse(xhr.responseText);
        cb(result.status);
    };
    xhr.send(data);
}

function sendAjaxJson(url, data, cb) {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
        let result = JSON.parse(xhr.responseText);
        cb(result.status);
    };
    xhr.send(JSON.stringify(data));
}