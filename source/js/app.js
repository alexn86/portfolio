(function () {
    'use strict';

    svg4everybody();

    let video = document.querySelector('.hero__video-file');
    if (video) {
        enableInlineVideo(video, {
            iPad: true
        });
    }

    $(function () {
        $('.button-arrow-down').click(function () {
            let win = $(window).height();

            $('body,html').animate({
                scrollTop: win
            }, 800);

            return false;
        });

        $('.button-arrow-up').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);

            return false;
        });

        $('.modal__close').on('click', function () {
            $(this).closest('.modal').css('visibility', 'hidden');
        });
    });

})();