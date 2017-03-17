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
            // showModal(data);
            location.href = '/admin';
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZsaXAuanMiLCJoYW0uanMiLCJwYXJhbGxheC5qcyIsInNraWxscy5qcyIsInByZWxvYWRlci5qcyIsImJsb2cuanMiLCJzbGlkZXIuanMiLCJmb3JtLmpzIiwiYWRtaW4uanMiLCJtYWlsLmpzIiwiZ2xvYmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgc3ZnNGV2ZXJ5Ym9keSgpO1xyXG5cclxuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX192aWRlby1maWxlJyk7XHJcbiAgICBpZiAodmlkZW8pIHtcclxuICAgICAgICBlbmFibGVJbmxpbmVWaWRlbyh2aWRlbywge1xyXG4gICAgICAgICAgICBpUGFkOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLmJ1dHRvbi1hcnJvdy1kb3duJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgd2luID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHdpblxyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuYnV0dG9uLWFycm93LXVwJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcubW9kYWxfX2Nsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5tb2RhbCcpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBoZXJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZXJvX3dlbGNvbWVcIiksXHJcbiAgICAgICAgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fY29udGFpbmVyX3dlbGNvbWVcIiksXHJcbiAgICAgICAgYXV0aEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idXR0b25cIiksXHJcbiAgICAgICAgYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fY29udGFpbmVyLWJhY2tcIiksXHJcbiAgICAgICAgbWVudUZsaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1tZW51X19pdGVtX2ZsaXAgYScpO1xyXG5cclxuICAgIGxldCBmbGlwID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgYyA9IGhlcm9Db250YWluZXIuY2xhc3NMaXN0O1xyXG5cclxuICAgICAgICBpZiAoZS50YXJnZXQgPT0gYXV0aEJ1dHRvbikge1xyXG4gICAgICAgICAgICBhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGMudG9nZ2xlKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKChhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnICYmICFiYWNrLmNvbnRhaW5zKGUudGFyZ2V0KSkgfHwgZS50YXJnZXQgPT0gbWVudUZsaXApIHtcclxuICAgICAgICAgICAgICAgIGF1dGhCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICBjLnRvZ2dsZSgnZmxpcHBlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaGVybykge1xyXG4gICAgICAgIGhlcm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmbGlwKTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBoYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJyksXHJcbiAgICAgICAgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XHJcblxyXG4gICAgbGV0IG9wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGhhbS5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51X2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChoYW0pIHtcclxuICAgICAgICBoYW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTWVudSk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX3dlbGNvbWUnKTtcclxuICAgIGxldCBoZXJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm8nKTtcclxuXHJcbiAgICBsZXQgcGFyYWxsYXhNb3VzZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyksXHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX3dlbGNvbWUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gKGxheWVyLCBwYWdlWCwgcGFnZVksIHJhdGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIHJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiByYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3Bvc2l0aW9uWH1weCwgJHtwb3NpdGlvbll9cHgsIDApYDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHBhZ2VYLCBwYWdlWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGxheWVyLCBwYWdlWCwgcGFnZVksIDAuMDUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBsZXQgcGFyYWxsYXhTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19iZycpLFxyXG4gICAgICAgICAgICBwaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fc2VjdGlvbi1waWMnKSxcclxuICAgICAgICAgICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIChsYXllciwgd1Njcm9sbCwgcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbCA9IHdTY3JvbGwgLyByYXRlICsgJyUnO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwLCAke3Njcm9sbH0sIDApYDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNjUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHBpYywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDE1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICBsZXQgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKGhlcm8pIHtcclxuICAgICAgICAgICAgcGFyYWxsYXhTY3JvbGwuaW5pdCh3U2Nyb2xsKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xyXG4gICAgICAgICAgICBwYXJhbGxheE1vdXNlLmluaXQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGFuaW1hdGVTa2lsbHMgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uIChzY3JvbGxUb3AsIGVsZW0pIHtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGVsZW0ub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICBsZXQgdG9wQm9yZGVyID0gIG9mZnNldCArIGVsZW0uaGVpZ2h0KCkgLSBzY3JvbGxUb3AgLSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdG9wQm9yZGVyIDw9IDA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbXMgPSAkKCcuc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbSA9ICR0aGlzLmZpbmQoJy5za2lsbF9fY2lyY2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVsZW0uaGFzQ2xhc3MoJ3NraWxsX19jaXJjbGVfYW5pbWF0ZWQnKSAmJiBjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgJHRoaXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZENsYXNzKCdza2lsbF9fY2lyY2xlX2FuaW1hdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAgKiBjb3VudGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFuaW1hdGVTa2lsbHMuaW5pdCgpO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBwcmVsb2FkZXIgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgcGVyY2VudHNUb3RhbCA9IDA7XHJcbiAgICAgICAgbGV0IHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuXHJcbiAgICAgICAgbGV0IGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG4gICAgICAgICAgICBsZXQgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuICAgICAgICAgICAgbGV0IGlzVmlkZW8gPSAkKGVsZW1lbnQpLmlzKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBsZXQgcGF0aCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNJbWcpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNWaWRlbykge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHNldFBlcmNlbnRzID0gZnVuY3Rpb24odG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50JykudGV4dChwZXJjZW50cyArICclJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGVyY2VudHMgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCg1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltZywgaSwgaW1hZ2VzKXtcclxuICAgICAgICAgICAgICAgIGxldCBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmMgOiBpbWdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2FkSW1hZ2VzKGltZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwcmVsb2FkZXIuaW5pdCgpO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgYmxvZ01lbnUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBuYXYgPSAkKCcuYmxvZy1uYXYnKTtcclxuICAgICAgICBsZXQgbmF2VG9wID0gbmF2LnBhcmVudCgpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICBsZXQgcG9zdCA9ICQoJy5wb3N0Jyk7XHJcbiAgICAgICAgbGV0IHBvc3RzID0gJCgnLmJsb2dfX3Bvc3RzJyk7XHJcbiAgICAgICAgbGV0IG5hdkxpc3QgPSAkKCcuYmxvZy1uYXZfX2xpc3QnKTtcclxuICAgICAgICBsZXQgbmF2SXRlbXMgPSAkKCcuYmxvZy1uYXZfX2l0ZW0nKTtcclxuICAgICAgICBsZXQgbmF2TGlua3MgPSAkKCcuYmxvZy1uYXZfX2xpbmsnKTtcclxuICAgICAgICBsZXQgc3dpcGUgPSAkKCcuYmxvZ19fc3dpcGUtYXJlYScpO1xyXG5cclxuICAgICAgICBsZXQgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uIChzY3JvbGxUb3AsIGVsZW0pIHtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGVsZW0ub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICBsZXQgd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKTtcclxuICAgICAgICAgICAgbGV0IHRvcEJvcmRlciA9IG9mZnNldCAtIHNjcm9sbFRvcCAtIHdNYXJnaW47XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxFbmQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgLy8gbGV0IGJvdHRvbUVkZ2UgPSBlbGVtLm91dGVySGVpZ2h0KCkgKyBvZmZzZXQ7XHJcbiAgICAgICAgICAgIC8vIGxldCBib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3TWFyZ2luIC0gYm90dG9tRWRnZTtcclxuXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdG9wQm9yZGVyIDw9IDAgfHwgKHNjcm9sbFRvcCA9PSBzY3JvbGxFbmQgJiYgZWxlbS5uZXh0KCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2dCb3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyAkKHdpbmRvdykuaGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLSBwb3N0cy5vZmZzZXQoKS50b3AgLSBwb3N0cy5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxNYXggPSBzY3JvbGxUb3AgKyBuYXZMaXN0LmhlaWdodCgpIC0gcG9zdHMub2Zmc2V0KCkudG9wIC0gcG9zdHMub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJsb2dCb3R0b21Cb3JkZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5vdXRlckhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5vdXRlckhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkgLSBibG9nQm90dG9tQm9yZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPCBuYXZUb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uYXYuY3NzKCdtYXJnaW4tdG9wJywgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmF2LmNzcygncG9zaXRpb24nLCAnc3RhdGljJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmF2LmNzcygndG9wJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5zdG9wKCkuYW5pbWF0ZSh7dG9wOiAwfSwgMzAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbE1heCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmF2LmNzcygnbWFyZ2luLXRvcCcsIGAke3Njcm9sbFRvcCAtIG5hdlRvcH1weGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uYXYuY3NzKCd0b3AnLCBgJHtzY3JvbGxUb3AgLSBuYXZUb3B9cHhgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5zdG9wKCkuYW5pbWF0ZSh7dG9wOiBgJHtzY3JvbGxUb3AgLSBuYXZUb3B9YH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmF2LmNzcygncG9zaXRpb24nLCAnZml4ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBvc3QuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrRGlzdGFuY2Uoc2Nyb2xsVG9wLCAkKHRoaXMpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2SXRlbXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYmxvZy1uYXZfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdkl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcygnYmxvZy1uYXZfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5ibG9nLW5hdl9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBuYXZMaW5rcy5pbmRleCgkKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IHBvc3QuZXEoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHNjcm9sbCA9IHBvc3Qub2Zmc2V0KCkudG9wIC0gTWF0aC5jZWlsKCQod2luZG93KS5oZWlnaHQoKSAvIDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGwgPSBwLm9mZnNldCgpLnRvcDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5ibG9nX19zd2lwZS1hcmVhJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5ibG9nX19jb2wtbGVmdCwgLmJsb2dfX2NvbC1yaWdodCcpLnRvZ2dsZUNsYXNzKCdzd2lwZScpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKCcuYmxvZy1uYXYnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYmxvZ01lbnUoKS5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgc2xpZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gMzAwLFxyXG4gICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGdldFJlcUl0ZW0gPSBmdW5jdGlvbiAoaXRlbXMsIGFjdGl2ZUl0ZW0sIHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSBhY3RpdmVJdGVtLmluZGV4KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY291bnRlciA+PSBpdGVtcy5sZW5ndGggLSAxICYmIHN0ZXAgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudGVyID09IDAgJiYgc3RlcCA8IDApIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY291bnRlciA9IGNvdW50ZXIgKyBzdGVwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbXMuZXEoY291bnRlcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IG1vdmVTbGlkZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIGRpcmVjdGlvbiwgc3RlcCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSAkKCcuc2xpZGVyX19pdGVtJywgY29udGFpbmVyKSxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW1fYWN0aXZlJyksXHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25WYWx1ZSA9IGRpcmVjdGlvbiA9PSAnZG93bicgPyAxMDAgOiAtMTAwO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcUl0ZW0gPSBnZXRSZXFJdGVtKGl0ZW1zLCBhY3RpdmVJdGVtLCBzdGVwKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAndG9wJyA6IGRpcmVjdGlvblZhbHVlICsgJyUnXHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAndG9wJyA6ICcwJ1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpLmNzcygndG9wJywgLWRpcmVjdGlvblZhbHVlICsgJyUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgc2hvd1NsaWRlID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgc3RlcCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSAkKCcuc2xpZGVyX19pdGVtJywgY29udGFpbmVyKSxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5zbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVxSXRlbSA9IGdldFJlcUl0ZW0oaXRlbXMsIGFjdGl2ZUl0ZW0sIHN0ZXApO1xyXG5cclxuICAgICAgICAgICAgcmVxSXRlbS5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCAwKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKS5jc3MoJ3RvcCcsIDEwMCArICclJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICByZXFJdGVtLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBzaG93RGVzYyA9IGZ1bmN0aW9uIChzdGVwKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtcyA9ICQoJy5zbGlkZXJfX2Rlc2MtY29udGFpbmVyJyksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyX19kZXNjLWNvbnRhaW5lcl9hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXFJdGVtID0gZ2V0UmVxSXRlbShpdGVtcywgYWN0aXZlSXRlbSwgc3RlcCk7XHJcbiAgICAgICAgICAgIHJlcUl0ZW0uZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgMCk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2Rlc2MtY29udGFpbmVyX2FjdGl2ZScpLmNzcygndG9wJywgMTAwICsgJyUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NsaWRlcl9fZGVzYy1jb250YWluZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICByZXFJdGVtLmZhZGVJbigpO1xyXG4gICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19pdGVtJywgJy5zbGlkZXJfX2J0bl9sZWZ0JykubGFzdCgpLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19pdGVtJywgJy5zbGlkZXJfX2J0bl9yaWdodCcpLmVxKDEpLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19pdGVtJywgJy5zbGlkZXJfX3ByZXZpZXcnKS5lcSgwKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9fZGVzYy1jb250YWluZXInKS5maXJzdCgpLmFkZENsYXNzKCdzbGlkZXJfX2Rlc2MtY29udGFpbmVyX2FjdGl2ZScpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19idG5fcmlnaHQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFySW50ZXJ2YWwobW92ZVVwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpblByb2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlKCQoJy5zbGlkZXJfX2J0bl9sZWZ0JyksICdkb3duJywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZSgkKCcuc2xpZGVyX19idG5fcmlnaHQnKSwgJ3VwJywgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dTbGlkZSgkKCcuc2xpZGVyX19wcmV2aWV3JyksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93RGVzYygxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19idG5fbGVmdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXJJbnRlcnZhbChtb3ZlVXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpblByb2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGUoJCgnLnNsaWRlcl9fYnRuX2xlZnQnKSwgJ2Rvd24nLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZSgkKCcuc2xpZGVyX19idG5fcmlnaHQnKSwgJ3VwJywgLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93U2xpZGUoJCgnLnNsaWRlcl9fcHJldmlldycpLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEZXNjKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgbW92ZVVwID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG1vdmVTbGlkZSgkKCcuc2xpZGVyX19idG5fbGVmdCcpLCAnZG93bicsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIG1vdmVTbGlkZSgkKCcuc2xpZGVyX19idG5fcmlnaHQnKSwgJ3VwJywgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc2hvd1NsaWRlKCQoJy5zbGlkZXJfX3ByZXZpZXcnKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc2hvd0Rlc2MoMSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCA1MDAwKTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyAkKCcuc2xpZGVyX19idG4nKS5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0oKSk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2xpZGVyLmluaXQoKTtcclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGZvcm0gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBmb3JtID0gJCgnZm9ybScpO1xyXG5cclxuICAgICAgICBsZXQgdmFsaWRhdGVGb3JtID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgaW5wdXRzID0gJCgnLmZvcm1fX2ZpZWxkJywgZm9ybSksXHJcbiAgICAgICAgICAgICAgICBpc0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyID0gJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEkKHRoaXMpLnZhbCgpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVyciA9ICfQktGLINC90LUg0LLQstC10LvQuCAnICsgJCh0aGlzKS5kYXRhKCdmaWVsZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Zvcm1fX2ZpZWxkX2Vycm9yJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Zvcm1fX2ZpZWxkX2Vycm9yJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS5zaWJsaW5ncygnLmZvcm1fX2Vycm9yJykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dFcnJvcigkKHRoaXMpLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gIWlzRXJyb3I7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dFcnJvciA9IGZ1bmN0aW9uKGVsZW0sIGVycm9yVGV4dCkge1xyXG4gICAgICAgICAgICBsZXQgZXJyb3JUYWcgPSAnPHNwYW4gY2xhc3M9XCJmb3JtX19lcnJvclwiPicgKyBlcnJvclRleHQgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGxldCBlcnJvciA9IGVsZW0ucGFyZW50KCkuYXBwZW5kKGVycm9yVGFnKS5maW5kKCcuZm9ybV9fZXJyb3InKTtcclxuXHJcbiAgICAgICAgICAgIGVycm9yLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAndG9wJzogZWxlbS5vdXRlckhlaWdodCgpICsgMTQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgJ2xlZnQnOiBlbGVtLm91dGVyV2lkdGgoKSAvIDIgLSBlcnJvci5vdXRlcldpZHRoKCkgLyAyXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5mb3JtLW1lbnVfX2l0ZW1fc3VibWl0JykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0ZUZvcm0oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5mb3JtX19lcnJvcicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZm9ybS5vbignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGZvcm0uaGFzQ2xhc3MoJ2hlcm9fX2Zvcm0nKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZygnaGVybycpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIH0gZWxzZSBpZiAoZm9ybS5oYXNDbGFzcygncmV2aWV3c19fZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZXZpZXdzJyk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmZvcm0tbWVudV9faXRlbV9yZXNldCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS50cmlnZ2VyKCdyZXNldCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvcm0uaW5pdCgpO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvLy0tLS0tIGJsb2NrIFdvcmtzXHJcblxyXG4gICAgY29uc3QgZm9ybVdvcmtzID0gJCgnLmFkbWluLXdvcmtzX19mb3JtJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlcGFyZUFkZFdvcmsoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZG1pbi13b3Jrc19fdXBsb2FkLXN0YXR1cycpO1xyXG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGxldCBmaWxlID0gZG9jdW1lbnRcclxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5hZG1pbi13b3Jrc19fdXBsb2FkLWlucHV0JylcclxuICAgICAgICAgICAgLmZpbGVzWzBdO1xyXG5cclxuICAgICAgICBmb3JtV29ya3Muc2VyaWFsaXplQXJyYXkoKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChpdGVtLm5hbWUsIGl0ZW0udmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGhvdG8nLCBmaWxlLCBmaWxlLm5hbWUpO1xyXG5cclxuICAgICAgICBzZW5kQWpheCgnL3dvcmtzL2FkZCcsIGZvcm1EYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBzaG93TW9kYWwoZGF0YSk7XHJcbiAgICAgICAgICAgIGZvcm1Xb3Jrcy50cmlnZ2VyKCdyZXNldCcpO1xyXG4gICAgICAgICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd1VwbG9hZFN0YXR1cygpIHtcclxuICAgICAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkbWluLXdvcmtzX191cGxvYWQtc3RhdHVzJyk7XHJcbiAgICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgbGV0IGZpbGUgPSBkb2N1bWVudFxyXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLmFkbWluLXdvcmtzX191cGxvYWQtaW5wdXQnKVxyXG4gICAgICAgICAgICAuZmlsZXNbMF07XHJcblxyXG4gICAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBmaWxlLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLSBibG9jayBCbG9nXHJcblxyXG4gICAgY29uc3QgZm9ybUJsb2cgPSAkKCcuYWRtaW4tYmxvZ19fZm9ybScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG5cclxuICAgICAgICBmb3JtQmxvZy5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgZGF0YVtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvYmxvZy9hZGQnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBzaG93TW9kYWwoZGF0YSk7XHJcbiAgICAgICAgICAgIGZvcm1CbG9nLnRyaWdnZXIoJ3Jlc2V0Jyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8tLS0tLSBibG9jayBTa2lsbHNcclxuXHJcbiAgICBjb25zdCBmb3JtU2tpbGxzID0gJCgnLmFkbWluLXNraWxscy1mb3JtJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJlcGFyZVVwZGF0ZVNraWxscyhlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IGZvcm1Ta2lsbHMuc2VyaWFsaXplSlNPTigpO1xyXG5cclxuICAgICAgICBzZW5kQWpheEpzb24oJy9hYm91dC91cGRhdGUnLCBkYXRhLnNraWxscywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgc2hvd01vZGFsKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0gYmxvY2sgQXV0aFxyXG5cclxuICAgIGNvbnN0IGZvcm1BdXRoID0gJCgnLmhlcm9fX2Zvcm0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlQXV0aChlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHt9O1xyXG4gICAgICAgIGZvcm1BdXRoLnNlcmlhbGl6ZUFycmF5KCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBkYXRhW2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzZW5kQWpheEpzb24oJy9sb2dpbicsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIHNob3dNb2RhbChkYXRhKTtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcvYWRtaW4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0gZG9jdW1lbnQgUmVhZHlcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcuYWRtaW4tbWVudV9fbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcuYWRtaW4tbWVudV9faXRlbScpO1xyXG4gICAgICAgICAgICBsZXQgdGFiID0gJCgnLmFkbWluX19tYWluLXRhYicpO1xyXG5cclxuICAgICAgICAgICAgdGFiLmVxKGl0ZW0uaW5kZXgoKSlcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWRtaW5fX21haW4tdGFiX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhZG1pbl9fbWFpbi10YWJfYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBpdGVtLmFkZENsYXNzKCdhZG1pbi1tZW51X19pdGVtX2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhZG1pbi1tZW51X19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuYWRtaW5fX2hlYWRlci1iYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBoaXN0b3J5LmJhY2soKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGZvcm1Xb3Jrcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9ybVdvcmtzLm9uKCdzdWJtaXQnLCBwcmVwYXJlQWRkV29yayk7XHJcbiAgICAgICAgICAgICQoJy5hZG1pbi13b3Jrc19fdXBsb2FkLWlucHV0Jykub24oJ2NoYW5nZScsIHNob3dVcGxvYWRTdGF0dXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZm9ybUJsb2cubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcm1CbG9nLm9uKCdzdWJtaXQnLCBwcmVwYXJlU2VuZFBvc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZvcm1Ta2lsbHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcm1Ta2lsbHMub24oJ3N1Ym1pdCcsIHByZXBhcmVVcGRhdGVTa2lsbHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZvcm1BdXRoLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3JtQXV0aC5vbignc3VibWl0JywgcHJlcGFyZUF1dGgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGNvbnN0IGZvcm1NYWlsID0gJCgnLnJldmlld3NfX2Zvcm0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlU2VuZE1haWwoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICBcclxuICAgICAgICBmb3JtTWFpbC5zZXJpYWxpemVBcnJheSgpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgZGF0YVtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VuZEFqYXhKc29uKCcvY29udGFjdCcsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHNob3dNb2RhbChkYXRhKTtcclxuICAgICAgICAgICAgZm9ybU1haWwudHJpZ2dlcigncmVzZXQnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZm9ybU1haWwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvcm1NYWlsLm9uKCdzdWJtaXQnLCBwcmVwYXJlU2VuZE1haWwpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIHNob3dNb2RhbChtZXNzYWdlKSB7XHJcbiAgICBsZXQgbW9kYWwgPSAkKCcubW9kYWwnKTtcclxuXHJcbiAgICBtb2RhbC5maW5kKCcubW9kYWxfX21lc3NhZ2UnKS50ZXh0KG1lc3NhZ2UpO1xyXG4gICAgbW9kYWwuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VuZEFqYXgodXJsLCBkYXRhLCBjYikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKGRhdGEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZW5kQWpheEpzb24odXJsLCBkYXRhLCBjYikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG59Il19
