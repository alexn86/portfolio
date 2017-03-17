(function () {
    'use strict';

    let slider = (function(){
        let duration = 300,
            inProcess = false;

        let getReqItem = function (items, activeItem, step) {
            let counter = activeItem.index();

            if (counter >= items.length - 1 && step > 0) {
                counter = 0;
            } else if (counter == 0 && step < 0) {
                counter = items.length - 1;
            } else {
                counter = counter + step;
            }

            return items.eq(counter);
        };

        let moveSlide = function (container, direction, step) {
            let items = $('.slider__item', container),
                activeItem = items.filter('.slider__item_active'),
                directionValue = direction == 'down' ? 100 : -100;

            let reqItem = getReqItem(items, activeItem, step);

            activeItem.animate({
                'top' : directionValue + '%'
            }, duration);

            reqItem.animate({
                'top' : '0'
            }, duration, function () {
                activeItem.removeClass('slider__item_active').css('top', -directionValue + '%');
                $(this).addClass('slider__item_active');
                inProcess = false;
            });
        };

        let showSlide = function (container, step) {
            let items = $('.slider__item', container),
                activeItem = items.filter('.slider__item_active');

            let reqItem = getReqItem(items, activeItem, step);

            reqItem.fadeOut(function () {
                $(this).css('top', 0);
                activeItem.removeClass('slider__item_active').css('top', 100 + '%');
                $(this).addClass('slider__item_active');
                reqItem.fadeIn();
                inProcess = false;
            });
        };

        let showDesc = function (step) {
            let items = $('.slider__desc-container'),
                activeItem = items.filter('.slider__desc-container_active');

            let reqItem = getReqItem(items, activeItem, step);
            reqItem.fadeOut(function () {
                $(this).css('top', 0);
                activeItem.removeClass('slider__desc-container_active').css('top', 100 + '%');
                $(this).addClass('slider__desc-container_active');
                reqItem.fadeIn();
                inProcess = false;
            });
        };

        return {
            init: function () {

                $('.slider__item', '.slider__btn_left').last().addClass('slider__item_active');
                $('.slider__item', '.slider__btn_right').eq(1).addClass('slider__item_active');
                $('.slider__item', '.slider__preview').eq(0).addClass('slider__item_active');
                $('.slider__desc-container').first().addClass('slider__desc-container_active');


                $('.slider__btn_right').on('click', function(e){
                    e.preventDefault();

                    // clearInterval(moveUp);

                    if (!inProcess) {
                        inProcess = true;
                        moveSlide($('.slider__btn_left'), 'down', 1);
                        moveSlide($('.slider__btn_right'), 'up', 1);
                        showSlide($('.slider__preview'), 1);
                        showDesc(1);
                    }
                });

                $('.slider__btn_left').on('click', function(e){
                    e.preventDefault();

                    // clearInterval(moveUp);

                    if (!inProcess) {
                        inProcess = true;
                        moveSlide($('.slider__btn_left'), 'down', -1);
                        moveSlide($('.slider__btn_right'), 'up', -1);
                        showSlide($('.slider__preview'), -1);
                        showDesc(-1);
                    }
                });

                // let moveUp = setInterval(function () {
                //     moveSlide($('.slider__btn_left'), 'down', 1);
                //     moveSlide($('.slider__btn_right'), 'up', 1);
                //     showSlide($('.slider__preview'), 1);
                //     showDesc(1);
                // }, 5000);
                //
                // $('.slider__btn').on('mouseout', function () {
                //
                // })
            }
        }
    }());

    $(function () {
        slider.init();
    });
})();