(function () {
    'use strict';

    const formMail = $('.reviews__form');

    function prepareSendMail(e) {
        e.preventDefault();

        let data = {};
        
        formMail.serializeArray().forEach(function (item) {
            data[item.name] = item.value;
        });

        sendAjaxJson('/contact', data, function (data) {
            showModal(data);
            formMail.trigger('reset');
        });
    }

    $(function () {
        if (formMail.length) {
            formMail.on('submit', prepareSendMail);
        }
    });
})();