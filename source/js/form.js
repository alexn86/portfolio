(function () {
    'use strict';

    let form = (function () {
        let form = $('form');

        let validateForm = function () {
            let inputs = $('.form__field', form),
                isError = false;

            inputs.each(function () {
                let err = '';

                if (!$(this).val().length) {
                    err = 'Вы не ввели ' + $(this).data('field');
                }

                $(this).removeClass('form__field_error');
                if (err.length) {
                    isError = true;
                    $(this).addClass('form__field_error');

                    if (!$(this).siblings('.form__error').length) {
                        showError($(this), err);
                    }
                }
            });

            return !isError;
        };

        let showError = function(elem, errorText) {
            let errorTag = '<span class="form__error">' + errorText + '</span>';
            let error = elem.parent().append(errorTag).find('.form__error');

            error.css({
                'top': elem.outerHeight() + 14 + 'px',
                'left': elem.outerWidth() / 2 - error.outerWidth() / 2
            });
        };

        return {
            init: function () {

                $(document).on('click', function (event) {
                    if (event.target.closest('.form-menu__item_submit')) {
                        event.preventDefault();

                        if (validateForm()) {
                            form.submit();
                        }
                    } else {
                        $('.form__error').each(function () {
                            $(this).remove();
                        });
                    }
                });

                // form.on('submit', function (event) {
                //     event.preventDefault();
                //
                //     if (form.hasClass('hero__form')) {
                //         // console.log('hero');
                //     } else if (form.hasClass('reviews__form')) {
                //         // console.log('reviews');
                //     }
                // });

                $('.form-menu__item_reset').on('click', function (event) {
                    event.preventDefault();
                    form.trigger('reset');
                });
            }
        }
    })();

    $(function () {
        form.init();
    });
})();