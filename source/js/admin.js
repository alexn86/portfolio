(function () {
    'use strict';

    //----- block Works

    const formWorks = $('.admin-works__form');

    function prepareAddWork(e) {
        e.preventDefault();

        let resultContainer = document.querySelector('.admin-works__upload-status');
        let formData = new FormData();
        let file = document
            .querySelector('.admin-works__upload-input')
            .files[0];

        formWorks.serializeArray().forEach(function (item) {
            formData.append(item.name, item.value);
        });
        formData.append('photo', file, file.name);

        sendAjax('/works/add', formData, function (data) {
            showModal(data);
            formWorks.trigger('reset');
            resultContainer.innerHTML = '';
        });
    }

    function showUploadStatus() {
        let resultContainer = document.querySelector('.admin-works__upload-status');
        let formData = new FormData();
        let file = document
            .querySelector('.admin-works__upload-input')
            .files[0];

        resultContainer.innerHTML = file.name;
    }

    //----- block Blog

    const formBlog = $('.admin-blog__form');

    function prepareSendPost(e) {
        e.preventDefault();

        let data = {};

        formBlog.serializeArray().forEach(function (item) {
            data[item.name] = item.value;
        });

        sendAjaxJson('/blog/add', data, function (data) {
            showModal(data);
            formBlog.trigger('reset');
        });
    }

    //----- block Skills

    const formSkills = $('.admin-skills-form');

    function prepareUpdateSkills(e) {
        e.preventDefault();

        let data = formSkills.serializeJSON();

        sendAjaxJson('/about/update', data.skills, function (data) {
            showModal(data);
        });
    }

    //----- block Auth

    const formAuth = $('.hero__form');

    function prepareAuth(e) {
        e.preventDefault();

        let data = {};
        formAuth.serializeArray().forEach(function (item) {
            data[item.name] = item.value;
        });

        sendAjaxJson('/login', data, function (data) {
            showModal(data);
        });
    }

    //----- document Ready

    $(function () {
        $('.admin-menu__link').on('click', function (e) {
            e.preventDefault();

            let item = $(this).closest('.admin-menu__item');
            let tab = $('.admin__main-tab');

            tab.eq(item.index())
                .addClass('admin__main-tab_active')
                .siblings()
                .removeClass('admin__main-tab_active');

            item.addClass('admin-menu__item_active')
                .siblings()
                .removeClass('admin-menu__item_active');
        });

        $('.admin__header-back').on('click', function () {
            history.back();
        });

        if (formWorks.length) {
            formWorks.on('submit', prepareAddWork);
            $('.admin-works__upload-input').on('change', showUploadStatus)
        }

        if (formBlog.length) {
            formBlog.on('submit', prepareSendPost);
        }

        if (formSkills.length) {
            formSkills.on('submit', prepareUpdateSkills);
        }

        if (formAuth.length) {
            formAuth.on('submit', prepareAuth);
        }
    });

})();