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
(function () {
    'use strict';

    let hero = document.querySelector(".hero_welcome"),
        heroContainer = document.querySelector(".hero__container_welcome"),
        authButton = document.querySelector(".auth-button"),
        back = document.querySelector(".hero__container-back"),
        menuFlip = document.querySelector('.form-menu__item_flip a');

    let flip = function (e) {
        let c = heroContainer.classList;

        if (e.target == authButton) {
            authButton.style.display = 'none';
            c.toggle('flipped');
        } else {
            if ((authButton.style.display == 'none' && !back.contains(e.target)) || e.target == menuFlip) {
                authButton.style.display = 'block';
                c.toggle('flipped');
            }
        }
    };

    if (hero) {
        hero.addEventListener('click', flip);
    }
})();
(function () {
    'use strict';

    let ham = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu');

    let openMenu = function () {
        ham.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    }

    if (ham) {
        ham.addEventListener('click', openMenu);
    }
})();

(function () {
    'use strict';

    let container = document.querySelector('.hero_welcome');
    let hero = document.querySelector('.hero');

    let parallaxMouse = (function () {
        let layer = document.querySelector('.hero__bg'),
            container = document.querySelector('.hero_welcome');

        return {
            move: function (layer, pageX, pageY, rate) {
                let initialX = (window.innerWidth / 2) - pageX,
                    initialY = (window.innerHeight / 2) - pageY,
                    positionX = initialX * rate,
                    positionY = initialY * rate;

                layer.style.transform = `translate3d(${positionX}px, ${positionY}px, 0)`;
            },
            init: function (pageX, pageY) {
                this.move(layer, pageX, pageY, 0.05);
            }
        }
    })();

    let parallaxScroll = (function () {
        let bg = document.querySelector('.hero__bg'),
            pic = document.querySelector('.hero__section-pic'),
            user = document.querySelector('.user');

        return {
            move: function (layer, wScroll, rate) {
                let scroll = wScroll / rate + '%';

                layer.style.transform = `translate3d(0, ${scroll}, 0)`;
            },
            init: function (wScroll) {
                this.move(bg, wScroll, 65);
                this.move(pic, wScroll, 45);
                this.move(user, wScroll, 15);
            }
        }
    })();

    window.addEventListener('scroll', () => {
        let wScroll = window.pageYOffset;

        if (hero) {
            parallaxScroll.init(wScroll);
        }
    });

    if (container) {
        container.addEventListener('mousemove', e => {
            parallaxMouse.init(e.pageX, e.pageY);
        });
    }

})();
(function () {
    'use strict';

    let animateSkills = (function () {

        let checkDistance = function (scrollTop, elem) {
            let offset = elem.offset().top;
            let topBorder =  offset + elem.height() - scrollTop - $(window).height();

            return topBorder <= 0;
        };

        return {
            init: function () {
                $(window).on('scroll', function () {
                    let scrollTop = $(window).scrollTop();
                    let elems = $('.skill');
                    let counter = 0;

                    elems.each(function () {
                        let $this = $(this);
                        let elem = $this.find('.skill__circle');

                        if (!elem.hasClass('skill__circle_animated') && checkDistance(scrollTop, $this)) {
                            counter++;
                            setTimeout(function () {
                                elem.addClass('skill__circle_animated');
                            }, 200 * counter);

                        }
                    });
                })
            }
        }
    })();

    $(function () {
        animateSkills.init();
    });
})();
(function () {
    let preloader = (function(){
        let percentsTotal = 0;
        let preloader = $('.preloader');

        let imgPath = $('*').map(function (ndx, element) {
            let background = $(element).css('background-image');
            let isImg = $(element).is('img');
            let isVideo = $(element).is('video');
            let path = '';

            if (background != 'none') {
                path = background.replace('url("', '').replace('")', '');
            }

            if (isImg) {
                path = $(element).attr('src');
            }

            if (isVideo) {
                path = $(element).attr('src');
            }

            if (path) return path;
        });

        let setPercents = function(total, current) {
            let percents = Math.ceil(current / total * 100);

            $('.preloader__percent').text(percents + '%');

            if (percents >= 100) {
                preloader.fadeOut(500);
            }
        };

        let loadImages = function(images) {

            if (!images.length) preloader.fadeOut();

            images.forEach(function(img, i, images){
                let fakeImage = $('<img>', {
                    attr : {
                        src : img
                    }
                });

                fakeImage.on('load error', function(){
                    percentsTotal++;
                    setPercents(images.length, percentsTotal);
                });
            });

        };

        return {
            init: function () {
                let imgs = imgPath.toArray();

                loadImages(imgs);
            }
        }
    }());

    $(function () {
        preloader.init();
    });
})();
(function () {
    'use strict';

    let blogMenu = function () {

        let nav = $('.blog-nav');
        let navTop = nav.parent().offset().top;
        let post = $('.post');
        let posts = $('.blog__posts');
        let navList = $('.blog-nav__list');
        let navItems = $('.blog-nav__item');
        let navLinks = $('.blog-nav__link');
        let swipe = $('.blog__swipe-area');

        let checkDistance = function (scrollTop, elem) {
            let offset = elem.offset().top;
            let wMargin = Math.ceil($(window).height() / 3);
            let topBorder = offset - scrollTop - wMargin;
            let scrollEnd = $(document).height() - $(window).height();
            // let bottomEdge = elem.outerHeight() + offset;
            // let bottomBorder = scrollTop + wMargin - bottomEdge;

            //return topBorder <= 0 && bottomBorder <= 0;
            return topBorder <= 0 || (scrollTop == scrollEnd && elem.next());
        };

        return {
            init: function () {
                $(window).on('scroll', function () {
                    let scrollTop = $(window).scrollTop();
                    let blogBottomBorder = scrollTop + $(window).height()
                        - posts.offset().top - posts.outerHeight();
                    let scrollMax = scrollTop + navList.height() - posts.offset().top - posts.outerHeight();

                    if (blogBottomBorder < 0) {
                        nav.outerHeight($(window).height());
                    } else {
                        nav.outerHeight($(window).height() - blogBottomBorder);
                    }

                    if (scrollTop < navTop) {
                        //nav.css('margin-top', 0)
                        // nav.css('position', 'static');
                        //nav.css('top', 0);
                        nav.stop().animate({top: 0}, 300);

                    } else {
                        if (scrollMax < 0) {
                            //nav.css('margin-top', `${scrollTop - navTop}px`);
                            //nav.css('top', `${scrollTop - navTop}px`);
                            nav.stop().animate({top: `${scrollTop - navTop}`}, 300);
                        }
                        // nav.css('position', 'fixed');
                    }

                    post.each(function (index) {
                        if (checkDistance(scrollTop, $(this))) {
                            navItems.each(function () {
                                $(this).removeClass('blog-nav__item_active');
                            });
                            navItems.eq(index).addClass('blog-nav__item_active');
                        }
                    });
                });

                $('.blog-nav__link').on('click', function (e) {
                    e.preventDefault();

                    let index = navLinks.index($(this));
                    let p = post.eq(index);
                    //let scroll = post.offset().top - Math.ceil($(window).height() / 3);
                    let scroll = p.offset().top;

                    $('body,html').animate({
                        scrollTop: scroll
                    }, 800);
                });

                $('.blog__swipe-area').on('click', function () {
                    $('.blog__col-left, .blog__col-right').toggleClass('swipe');
                });
            }
        }
    };

    $(function () {
        if ($('.blog-nav').length) {
            blogMenu().init();
        }
    });
})();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZsaXAuanMiLCJoYW0uanMiLCJwYXJhbGxheC5qcyIsInNraWxscy5qcyIsInByZWxvYWRlci5qcyIsImJsb2cuanMiLCJzbGlkZXIuanMiLCJmb3JtLmpzIiwiYWRtaW4uanMiLCJtYWlsLmpzIiwiZ2xvYmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHN2ZzRldmVyeWJvZHkoKTtcclxuXHJcbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fdmlkZW8tZmlsZScpO1xyXG4gICAgaWYgKHZpZGVvKSB7XHJcbiAgICAgICAgZW5hYmxlSW5saW5lVmlkZW8odmlkZW8sIHtcclxuICAgICAgICAgICAgaVBhZDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5idXR0b24tYXJyb3ctZG93bicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHdpbiA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB3aW5cclxuICAgICAgICAgICAgfSwgODAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmJ1dHRvbi1hcnJvdy11cCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgfSwgODAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLm1vZGFsX19jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcubW9kYWwnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgaGVybyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb193ZWxjb21lXCIpLFxyXG4gICAgICAgIGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fX2NvbnRhaW5lcl93ZWxjb21lXCIpLFxyXG4gICAgICAgIGF1dGhCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtYnV0dG9uXCIpLFxyXG4gICAgICAgIGJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fX2NvbnRhaW5lci1iYWNrXCIpLFxyXG4gICAgICAgIG1lbnVGbGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbWVudV9faXRlbV9mbGlwIGEnKTtcclxuXHJcbiAgICBsZXQgZmxpcCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IGMgPSBoZXJvQ29udGFpbmVyLmNsYXNzTGlzdDtcclxuXHJcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09IGF1dGhCdXR0b24pIHtcclxuICAgICAgICAgICAgYXV0aEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBjLnRvZ2dsZSgnZmxpcHBlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgoYXV0aEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID09ICdub25lJyAmJiAhYmFjay5jb250YWlucyhlLnRhcmdldCkpIHx8IGUudGFyZ2V0ID09IG1lbnVGbGlwKSB7XHJcbiAgICAgICAgICAgICAgICBhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgYy50b2dnbGUoJ2ZsaXBwZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGhlcm8pIHtcclxuICAgICAgICBoZXJvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmxpcCk7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgaGFtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpLFxyXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xyXG5cclxuICAgIGxldCBvcGVuTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBoYW0uY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyX2FjdGl2ZScpO1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudV9hY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGFtKSB7XHJcbiAgICAgICAgaGFtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1lbnUpO1xyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb193ZWxjb21lJyk7XHJcbiAgICBsZXQgaGVybyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvJyk7XHJcblxyXG4gICAgbGV0IHBhcmFsbGF4TW91c2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19iZycpLFxyXG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb193ZWxjb21lJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIChsYXllciwgcGFnZVgsIHBhZ2VZLCByYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiByYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogcmF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtwb3NpdGlvblh9cHgsICR7cG9zaXRpb25ZfXB4LCAwKWA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChwYWdlWCwgcGFnZVkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShsYXllciwgcGFnZVgsIHBhZ2VZLCAwLjA1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgbGV0IHBhcmFsbGF4U2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fYmcnKSxcclxuICAgICAgICAgICAgcGljID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX3NlY3Rpb24tcGljJyksXHJcbiAgICAgICAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcicpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb3ZlOiBmdW5jdGlvbiAobGF5ZXIsIHdTY3JvbGwsIHJhdGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGwgPSB3U2Nyb2xsIC8gcmF0ZSArICclJztcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgJHtzY3JvbGx9LCAwKWA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDY1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShwaWMsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAxNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICAgIGlmIChoZXJvKSB7XHJcbiAgICAgICAgICAgIHBhcmFsbGF4U2Nyb2xsLmluaXQod1Njcm9sbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcclxuICAgICAgICAgICAgcGFyYWxsYXhNb3VzZS5pbml0KGUucGFnZVgsIGUucGFnZVkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBhbmltYXRlU2tpbGxzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbiAoc2Nyb2xsVG9wLCBlbGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgbGV0IHRvcEJvcmRlciA9ICBvZmZzZXQgKyBlbGVtLmhlaWdodCgpIC0gc2Nyb2xsVG9wIC0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRvcEJvcmRlciA8PSAwO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1zID0gJCgnLnNraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW0gPSAkdGhpcy5maW5kKCcuc2tpbGxfX2NpcmNsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbGVtLmhhc0NsYXNzKCdza2lsbF9fY2lyY2xlX2FuaW1hdGVkJykgJiYgY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsICR0aGlzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRDbGFzcygnc2tpbGxfX2NpcmNsZV9hbmltYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwICogY291bnRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhbmltYXRlU2tpbGxzLmluaXQoKTtcclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gICAgICAgIGxldCBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcblxyXG4gICAgICAgIGxldCBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICAgICAgbGV0IGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XHJcbiAgICAgICAgICAgIGxldCBpc1ZpZGVvID0gJChlbGVtZW50KS5pcygndmlkZW8nKTtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzSW1nKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzVmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGg7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudCcpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oaW1hZ2VzKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWcsIGksIGltYWdlcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmFrZUltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0ciA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjIDogaW1nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0oKSk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcHJlbG9hZGVyLmluaXQoKTtcclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGJsb2dNZW51ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgbmF2ID0gJCgnLmJsb2ctbmF2Jyk7XHJcbiAgICAgICAgbGV0IG5hdlRvcCA9IG5hdi5wYXJlbnQoKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgbGV0IHBvc3QgPSAkKCcucG9zdCcpO1xyXG4gICAgICAgIGxldCBwb3N0cyA9ICQoJy5ibG9nX19wb3N0cycpO1xyXG4gICAgICAgIGxldCBuYXZMaXN0ID0gJCgnLmJsb2ctbmF2X19saXN0Jyk7XHJcbiAgICAgICAgbGV0IG5hdkl0ZW1zID0gJCgnLmJsb2ctbmF2X19pdGVtJyk7XHJcbiAgICAgICAgbGV0IG5hdkxpbmtzID0gJCgnLmJsb2ctbmF2X19saW5rJyk7XHJcbiAgICAgICAgbGV0IHN3aXBlID0gJCgnLmJsb2dfX3N3aXBlLWFyZWEnKTtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbiAoc2Nyb2xsVG9wLCBlbGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgbGV0IHdNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyk7XHJcbiAgICAgICAgICAgIGxldCB0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3TWFyZ2luO1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsRW5kID0gJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBib3R0b21FZGdlID0gZWxlbS5vdXRlckhlaWdodCgpICsgb2Zmc2V0O1xyXG4gICAgICAgICAgICAvLyBsZXQgYm90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd01hcmdpbiAtIGJvdHRvbUVkZ2U7XHJcblxyXG4gICAgICAgICAgICAvL3JldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIHRvcEJvcmRlciA8PSAwIHx8IChzY3JvbGxUb3AgPT0gc2Nyb2xsRW5kICYmIGVsZW0ubmV4dCgpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9nQm90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgJCh3aW5kb3cpLmhlaWdodCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0gcG9zdHMub2Zmc2V0KCkudG9wIC0gcG9zdHMub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsTWF4ID0gc2Nyb2xsVG9wICsgbmF2TGlzdC5oZWlnaHQoKSAtIHBvc3RzLm9mZnNldCgpLnRvcCAtIHBvc3RzLm91dGVySGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChibG9nQm90dG9tQm9yZGVyIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXYub3V0ZXJIZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXYub3V0ZXJIZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpIC0gYmxvZ0JvdHRvbUJvcmRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgbmF2VG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmF2LmNzcygnbWFyZ2luLXRvcCcsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hdi5jc3MoJ3Bvc2l0aW9uJywgJ3N0YXRpYycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25hdi5jc3MoJ3RvcCcsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXYuc3RvcCgpLmFuaW1hdGUoe3RvcDogMH0sIDMwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxNYXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hdi5jc3MoJ21hcmdpbi10b3AnLCBgJHtzY3JvbGxUb3AgLSBuYXZUb3B9cHhgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmF2LmNzcygndG9wJywgYCR7c2Nyb2xsVG9wIC0gbmF2VG9wfXB4YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXYuc3RvcCgpLmFuaW1hdGUoe3RvcDogYCR7c2Nyb2xsVG9wIC0gbmF2VG9wfWB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hdi5jc3MoJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3N0LmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgJCh0aGlzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdkl0ZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Jsb2ctbmF2X19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZJdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoJ2Jsb2ctbmF2X19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYmxvZy1uYXZfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbmF2TGlua3MuaW5kZXgoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBwb3N0LmVxKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBzY3JvbGwgPSBwb3N0Lm9mZnNldCgpLnRvcCAtIE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsID0gcC5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYmxvZ19fc3dpcGUtYXJlYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYmxvZ19fY29sLWxlZnQsIC5ibG9nX19jb2wtcmlnaHQnKS50b2dnbGVDbGFzcygnc3dpcGUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCgnLmJsb2ctbmF2JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGJsb2dNZW51KCkuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHNsaWRlciA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IDMwMCxcclxuICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBnZXRSZXFJdGVtID0gZnVuY3Rpb24gKGl0ZW1zLCBhY3RpdmVJdGVtLCBzdGVwKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gYWN0aXZlSXRlbS5pbmRleCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoIC0gMSAmJiBzdGVwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlciA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRlciA9PSAwICYmIHN0ZXAgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSBjb3VudGVyICsgc3RlcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBtb3ZlU2xpZGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24sIHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtX2FjdGl2ZScpLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVmFsdWUgPSBkaXJlY3Rpb24gPT0gJ2Rvd24nID8gMTAwIDogLTEwMDtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXFJdGVtID0gZ2V0UmVxSXRlbShpdGVtcywgYWN0aXZlSXRlbSwgc3RlcCk7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCcgOiBkaXJlY3Rpb25WYWx1ZSArICclJ1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICByZXFJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCcgOiAnMCdcclxuICAgICAgICAgICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKS5jc3MoJ3RvcCcsIC1kaXJlY3Rpb25WYWx1ZSArICclJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dTbGlkZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcUl0ZW0gPSBnZXRSZXFJdGVtKGl0ZW1zLCBhY3RpdmVJdGVtLCBzdGVwKTtcclxuXHJcbiAgICAgICAgICAgIHJlcUl0ZW0uZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgMCk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJykuY3NzKCd0b3AnLCAxMDAgKyAnJScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgcmVxSXRlbS5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgc2hvd0Rlc2MgPSBmdW5jdGlvbiAoc3RlcCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSAkKCcuc2xpZGVyX19kZXNjLWNvbnRhaW5lcicpLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLnNsaWRlcl9fZGVzYy1jb250YWluZXJfYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVxSXRlbSA9IGdldFJlcUl0ZW0oaXRlbXMsIGFjdGl2ZUl0ZW0sIHN0ZXApO1xyXG4gICAgICAgICAgICByZXFJdGVtLmZhZGVPdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIDApO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnc2xpZGVyX19kZXNjLWNvbnRhaW5lcl9hY3RpdmUnKS5jc3MoJ3RvcCcsIDEwMCArICclJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzbGlkZXJfX2Rlc2MtY29udGFpbmVyX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgcmVxSXRlbS5mYWRlSW4oKTtcclxuICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9faXRlbScsICcuc2xpZGVyX19idG5fbGVmdCcpLmxhc3QoKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9faXRlbScsICcuc2xpZGVyX19idG5fcmlnaHQnKS5lcSgxKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9faXRlbScsICcuc2xpZGVyX19wcmV2aWV3JykuZXEoMCkuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJy5zbGlkZXJfX2Rlc2MtY29udGFpbmVyJykuZmlyc3QoKS5hZGRDbGFzcygnc2xpZGVyX19kZXNjLWNvbnRhaW5lcl9hY3RpdmUnKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9fYnRuX3JpZ2h0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhckludGVydmFsKG1vdmVVcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZSgkKCcuc2xpZGVyX19idG5fbGVmdCcpLCAnZG93bicsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGUoJCgnLnNsaWRlcl9fYnRuX3JpZ2h0JyksICd1cCcsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93U2xpZGUoJCgnLnNsaWRlcl9fcHJldmlldycpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Rlc2MoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9fYnRuX2xlZnQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFySW50ZXJ2YWwobW92ZVVwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpblByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlKCQoJy5zbGlkZXJfX2J0bl9sZWZ0JyksICdkb3duJywgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGUoJCgnLnNsaWRlcl9fYnRuX3JpZ2h0JyksICd1cCcsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NsaWRlKCQoJy5zbGlkZXJfX3ByZXZpZXcnKSwgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93RGVzYygtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IG1vdmVVcCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBtb3ZlU2xpZGUoJCgnLnNsaWRlcl9fYnRuX2xlZnQnKSwgJ2Rvd24nLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBtb3ZlU2xpZGUoJCgnLnNsaWRlcl9fYnRuX3JpZ2h0JyksICd1cCcsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNob3dTbGlkZSgkKCcuc2xpZGVyX19wcmV2aWV3JyksIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNob3dEZXNjKDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgNTAwMCk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnLnNsaWRlcl9fYnRuJykub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KCkpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNsaWRlci5pbml0KCk7XHJcbiAgICB9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBmb3JtID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZm9ybSA9ICQoJ2Zvcm0nKTtcclxuXHJcbiAgICAgICAgbGV0IHZhbGlkYXRlRm9ybSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGlucHV0cyA9ICQoJy5mb3JtX19maWVsZCcsIGZvcm0pLFxyXG4gICAgICAgICAgICAgICAgaXNFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaW5wdXRzLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVyciA9ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS52YWwoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnIgPSAn0JLRiyDQvdC1INCy0LLQtdC70LggJyArICQodGhpcykuZGF0YSgnZmllbGQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdmb3JtX19maWVsZF9lcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdmb3JtX19maWVsZF9lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuc2libGluZ3MoJy5mb3JtX19lcnJvcicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93RXJyb3IoJCh0aGlzKSwgZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICFpc0Vycm9yO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBzaG93RXJyb3IgPSBmdW5jdGlvbihlbGVtLCBlcnJvclRleHQpIHtcclxuICAgICAgICAgICAgbGV0IGVycm9yVGFnID0gJzxzcGFuIGNsYXNzPVwiZm9ybV9fZXJyb3JcIj4nICsgZXJyb3JUZXh0ICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBsZXQgZXJyb3IgPSBlbGVtLnBhcmVudCgpLmFwcGVuZChlcnJvclRhZykuZmluZCgnLmZvcm1fX2Vycm9yJyk7XHJcblxyXG4gICAgICAgICAgICBlcnJvci5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCc6IGVsZW0ub3V0ZXJIZWlnaHQoKSArIDE0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICdsZWZ0JzogZWxlbS5vdXRlcldpZHRoKCkgLyAyIC0gZXJyb3Iub3V0ZXJXaWR0aCgpIC8gMlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuZm9ybS1tZW51X19pdGVtX3N1Ym1pdCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGVGb3JtKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuZm9ybV9fZXJyb3InKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZvcm0ub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChmb3JtLmhhc0NsYXNzKCdoZXJvX19mb3JtJykpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5sb2coJ2hlcm8nKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9IGVsc2UgaWYgKGZvcm0uaGFzQ2xhc3MoJ3Jldmlld3NfX2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygncmV2aWV3cycpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5mb3JtLW1lbnVfX2l0ZW1fcmVzZXQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0udHJpZ2dlcigncmVzZXQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3JtLmluaXQoKTtcclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgLy8tLS0tLSBibG9jayBXb3Jrc1xyXG5cclxuICAgIGNvbnN0IGZvcm1Xb3JrcyA9ICQoJy5hZG1pbi13b3Jrc19fZm9ybScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByZXBhcmVBZGRXb3JrKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRtaW4td29ya3NfX3VwbG9hZC1zdGF0dXMnKTtcclxuICAgICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBsZXQgZmlsZSA9IGRvY3VtZW50XHJcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcuYWRtaW4td29ya3NfX3VwbG9hZC1pbnB1dCcpXHJcbiAgICAgICAgICAgIC5maWxlc1swXTtcclxuXHJcbiAgICAgICAgZm9ybVdvcmtzLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoaXRlbS5uYW1lLCBpdGVtLnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuXHJcbiAgICAgICAgc2VuZEFqYXgoJy93b3Jrcy9hZGQnLCBmb3JtRGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgc2hvd01vZGFsKGRhdGEpO1xyXG4gICAgICAgICAgICBmb3JtV29ya3MudHJpZ2dlcigncmVzZXQnKTtcclxuICAgICAgICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dVcGxvYWRTdGF0dXMoKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZG1pbi13b3Jrc19fdXBsb2FkLXN0YXR1cycpO1xyXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGxldCBmaWxlID0gZG9jdW1lbnRcclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5hZG1pbi13b3Jrc19fdXBsb2FkLWlucHV0JylcclxuICAgICAgICAgICAgLmZpbGVzWzBdO1xyXG5cclxuICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZmlsZS5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0gYmxvY2sgQmxvZ1xyXG5cclxuICAgIGNvbnN0IGZvcm1CbG9nID0gJCgnLmFkbWluLWJsb2dfX2Zvcm0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZFBvc3QoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuXHJcbiAgICAgICAgZm9ybUJsb2cuc2VyaWFsaXplQXJyYXkoKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGRhdGFbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNlbmRBamF4SnNvbignL2Jsb2cvYWRkJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgc2hvd01vZGFsKGRhdGEpO1xyXG4gICAgICAgICAgICBmb3JtQmxvZy50cmlnZ2VyKCdyZXNldCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0gYmxvY2sgU2tpbGxzXHJcblxyXG4gICAgY29uc3QgZm9ybVNraWxscyA9ICQoJy5hZG1pbi1za2lsbHMtZm9ybScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByZXBhcmVVcGRhdGVTa2lsbHMoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBmb3JtU2tpbGxzLnNlcmlhbGl6ZUpTT04oKTtcclxuXHJcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvYWJvdXQvdXBkYXRlJywgZGF0YS5za2lsbHMsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHNob3dNb2RhbChkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tIGJsb2NrIEF1dGhcclxuXHJcbiAgICBjb25zdCBmb3JtQXV0aCA9ICQoJy5oZXJvX19mb3JtJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlcGFyZUF1dGgoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBmb3JtQXV0aC5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgZGF0YVtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvbG9naW4nLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBzaG93TW9kYWwoZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLSBkb2N1bWVudCBSZWFkeVxyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5hZG1pbi1tZW51X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy5hZG1pbi1tZW51X19pdGVtJyk7XHJcbiAgICAgICAgICAgIGxldCB0YWIgPSAkKCcuYWRtaW5fX21haW4tdGFiJyk7XHJcblxyXG4gICAgICAgICAgICB0YWIuZXEoaXRlbS5pbmRleCgpKVxyXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhZG1pbl9fbWFpbi10YWJfYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FkbWluX19tYWluLXRhYl9hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FkbWluLW1lbnVfX2l0ZW1fYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FkbWluLW1lbnVfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5hZG1pbl9faGVhZGVyLWJhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZm9ybVdvcmtzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3JtV29ya3Mub24oJ3N1Ym1pdCcsIHByZXBhcmVBZGRXb3JrKTtcclxuICAgICAgICAgICAgJCgnLmFkbWluLXdvcmtzX191cGxvYWQtaW5wdXQnKS5vbignY2hhbmdlJywgc2hvd1VwbG9hZFN0YXR1cylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmb3JtQmxvZy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9ybUJsb2cub24oJ3N1Ym1pdCcsIHByZXBhcmVTZW5kUG9zdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm9ybVNraWxscy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9ybVNraWxscy5vbignc3VibWl0JywgcHJlcGFyZVVwZGF0ZVNraWxscyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm9ybUF1dGgubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcm1BdXRoLm9uKCdzdWJtaXQnLCBwcmVwYXJlQXV0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgY29uc3QgZm9ybU1haWwgPSAkKCcucmV2aWV3c19fZm9ybScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByZXBhcmVTZW5kTWFpbChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcm1NYWlsLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBkYXRhW2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZW5kQWpheEpzb24oJy9jb250YWN0JywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgc2hvd01vZGFsKGRhdGEpO1xyXG4gICAgICAgICAgICBmb3JtTWFpbC50cmlnZ2VyKCdyZXNldCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChmb3JtTWFpbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9ybU1haWwub24oJ3N1Ym1pdCcsIHByZXBhcmVTZW5kTWFpbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gc2hvd01vZGFsKG1lc3NhZ2UpIHtcclxuICAgIGxldCBtb2RhbCA9ICQoJy5tb2RhbCcpO1xyXG5cclxuICAgIG1vZGFsLmZpbmQoJy5tb2RhbF9fbWVzc2FnZScpLnRleHQobWVzc2FnZSk7XHJcbiAgICBtb2RhbC5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kQWpheCh1cmwsIGRhdGEsIGNiKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoZGF0YSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBjYihyZXN1bHQuc3RhdHVzKTtcclxuICAgIH07XHJcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbn0iXX0=
