var appModule = (function() {

    var exportObj = {};

    var init = function() {
        svg4everybody();
        _setupSliders();
        _setupIndexContainerPadding();
        _setupTooltips();
        _textOverflowWithDots();
        _setupInputStyler();
        _setupCustomScroll();
        _setupShineMouseFollow();
        _setupAnimateNum();
        _setupModal();
        _reasonsSlider();
        _setupGallery();
        _previewTextIfLarge();
        // _spanInSupporterDesc();
        _eachButtonOnResize();
        _setupListeners();
        _initBattery();
        _video();
    };

    var _setupListeners = function() {
        $(document).on('mouseenter mouseout', '.btn_hover_pos-aware', _hoverEffectPositionAware);
        $(document).on('click', '.like', _setupLikeBtn);
        $(window).on('resize', _setupIndexContainerPadding);
        $(window).on('resize', _eachButtonOnResize);
        $(document).on('click', '.js-animate-scroll', _animateScrollLink);
        $(document).on('click', '.supporter__switch', _rollOutSupporterDesc);
        $(document).on('click', '.fund__switch', _rollOutFundDesc);
        _moveFixedHeaderOnScroll();
        _moveHelperSidebarMenuOnScroll();
        _runTypingAnimationOnScroll();
        _scrollFixedHeaderOnZoom();
        _addTriggerToAnimObjOnScroll();
        $(document).on('battery-loaded', function(e, $battery) {
            _initBattery($battery);
        });
        $(document).on('click', '.filled-btn',function(e, $battery) {
            setTimeout(function () {
                _initBattery($battery);
            }, 600);
        });
    };

    var _rollOutSupporterDesc =function(e) {
        var $this = $(this),
            $block = $this.closest('.supporter');

        $block.toggleClass('supporter_open');
    }

    var _rollOutFundDesc =function(e) {
        var $this = $(this),
            $block = $this.closest('.fund__text'),
            $text = $this.text();

        $text.toLowerCase() == "подробнее" ? $this.text('Скрыть') : $this.text('Подробнее');

        $block.toggleClass('fund__text_open');
    }

    var _spanInSupporterDesc = function() {
        $('.supporter__descr').wrapInner('<span></span>');
    }
    var _eachButtonOnResize = function() {
        $('.supporter__descr, .fund__text').each(_toggleButtonOnResize);

        function _toggleButtonOnResize() {
            if ($(this).hasClass('supporter__descr')) {
                $(this).closest('.supporter').removeClass('supporter_open');
                if($(this).find('span').height() - 6 > $(this).height()) $(this).find('.supporter__switch').show();
                if($(this).find('span').height() - 6 < $(this).height()) $(this).find('.supporter__switch').hide();
            } else if ($(this).hasClass('fund__text')) {
                $(this).removeClass('fund__text_open');
                if($(this).find('span').height() + 3 > $(this).height() && $.trim($(this).find('span').text()) != $.trim($(this).find('.fund__switch').text())) {
                    $(this).find('.fund__switch').show();
                } else {
                    $(this).find('.fund__switch').hide();
                }
            }
        }

    }

    var _previewTextIfLarge = function() {

        var $descr = $('.acts-one-info__descr')

        $('.acts-one-info__img-wrapper').imagesLoaded()
            .done( function( instance ) {

                if ($('.acts-one-info__descr').length) {

                    var $imgHeight = $('.acts-one-info__img-wrapper').height();

                    $descr.dotdotdot({
                        height: $imgHeight + 25,
                        after: "a.acts-one-info__link-more"
                    });

                }
            })
            .fail( function() {
                $descr.dotdotdot({
                    height: 250,
                    after: "a.acts-one-info__link-more"
                });

            });

        $('.js-text-trigger').on('click', function(e) {
            e.preventDefault();
            $descr.trigger("originalContent", function( content ) {

                $(this)
                    .html('')
                    .append( content )
                    .addClass('acts-one-info__descr_open');
            });
        });

    };

    var _moveFixedHeaderOnScroll = function() {

        var $transformHeader = $('.header_transform');

        var _moveHeaderOnScroll = function(e) {

            var $scroll = $(window).scrollTop(),
                $winHeight = $(window).height();

            if ($scroll > $headerHeight) {

                $transformHeader
                .removeClass('header_theme_air');

            } else {

                $transformHeader
                .addClass('header_theme_air');
            }

        }

        if ($transformHeader.length) {

            var $headerHeight = $transformHeader.height();

            _moveHeaderOnScroll();

            $(document).on('scroll', _moveHeaderOnScroll);
        }

    };

    var _scrollFixedHeaderOnZoom = function() {

        var $header = $('.header');

        var _hscrollbar = function() {

            var left =
            window.pageXOffset ? window.pageXOffset :
            document.documentElement.scrollLeft ? document.documentElement.scrollLeft :
            document.body.scrollLeft;

            $header.css('left', -left);
        };

        if ($header.length) {
            $(window).on('scroll resize', _hscrollbar);
        }

    }

    // двигает содержимое .helper-sidebar вместе со скроллом
    var _moveHelperSidebarMenuOnScroll = function() {

        var $helperSidebar = $('.helper-sidebar'),
        $sidebarMenu = $('.helper-sidebar__list');

        var _moveSidebarMenu = function(e) {

            var $scroll = $(window).scrollTop(),
            newMenuPos = $scroll - $menuOffset + $menuHeight + 'px';

            if ($scroll + $headerFixedHeight >= $sidebarOffset) {

                if ($scroll + $menuHeight <= $sidebarBottom - $menuHeight) {
                    $sidebarMenu.css('top', newMenuPos);
                }

            } else {

                $sidebarMenu.css('top', '');
            }

        }

        if ($sidebarMenu.length) {

            var $menuOffset = $sidebarMenu.offset().top,
            $menuHeight = $sidebarMenu.outerHeight(),
            $sidebarOffset = $helperSidebar.offset().top,
            $sidebarHeight = $helperSidebar.outerHeight(),
            $sidebarBottom = $sidebarOffset + $sidebarHeight,
            $headerFixedHeight = $('.header').outerHeight() || 0;

            $(document).on('scroll', _moveSidebarMenu);

        }

    };

    var _setupSliders = function() {

        var $actsSlider = $('.acts-sec__slider');

        if ($actsSlider.length) {
            $actsSlider.slick({
                slidesToShow: 3,
                slide: '.acts-sec__item',
                infinite: false
            });
        }

    };

    var _setupLikeBtn = function(e) {

        var $this = $(this);

        e.preventDefault();

        if (userAuth) {
            $this.toggleClass('like_active');
        }

    };

    var _setupTooltips = function() {

        var $tooltipElem = $('.tooltip');

        if ($tooltipElem.length) {

            $tooltipElem.each(function() {

                var $this = $(this),
                $content = $this.find('.tooltip__content'),
                $ontainerSelector = $this.data('container'),
                $container = $this.closest($ontainerSelector),
                position = {};

                // устанавливаем позицию тултипа в зависимости от содержимого data-tooltip-pos
                position.my = $this.data('position-my');
                position.at = $this.data('position-at');

                $this.qtip({
                    content: {
                        text: $content
                    },
                    position: {
                        my: position.my,
                        at: position.at,
                        container: $container
                    },
                    style: {
                        classes: 'qtip-rounded tooltip-popup'
                    },
                    show: {
                        solo: true
                    },
                    hide: 'unfocus scroll'
                });

            });

}

}

    // hover эффект position aware для кнопки
    var _hoverEffectPositionAware = function(e) {

        var $this = $(this),
        $hoverElem = $this.find('.btn__hover'),
        $parentOffset = $(this).offset(),
        relX = e.pageX - $parentOffset.left,
        relY = e.pageY - $parentOffset.top;

        $hoverElem.css({top:relY, left:relX});
    }

    // Эта функция рассчитывает нужный padding для блока .index-page__sections-col,
    // чтобы он был на уровне с другими блоками при расширении и сужении экрана
    var _setupIndexContainerPadding = function() {

        var windowWidth = document.body.clientWidth,
        $container = $('.index-page__sections-col .container');

        // Если такого блока нет на странице, отключаем обработчик
        if (!$container.length) {
            $(window).off('resize', _setupIndexContainerPadding);
        }

        if (windowWidth > 1440) {

            var containerWidth = $container.outerWidth(),
            newPadding = 150 - ((windowWidth - containerWidth) / 2);

            if (newPadding > 30) {
                $container.css('padding-right', newPadding);
            } else {
                $container.css('padding-right', 30);
            }

        } else {

            $container.css('padding-right', '');
        }

    };

    var _runTypingAnimationOnScroll = function() {

        var $animObj = $('.js-typing-anim');

        if ($animObj.length) {

            $animObj.each(function() {

                var $this = $(this);

                fnModule.triggerOnScroll($this, function() {
                    $this.typingAnimation(100);
                });

            });

        }

    };

    var pageOpenTime = new Date();

    var _initBattery = function($battery) {

        var $battery = $battery || $('.battery'),
            percent_number_step = $.animateNumber.numberStepFactories.append('%');

        if ($battery.length) {
            $battery.each(function() {

                var $this = $(this),
                    val = parseInt($this.data('val')),
                    $progressBar = $this.find('.battery__progress'),
                    $valBlock = $this.find('.battery__val');

                val = isNaN(val) ? 0 : val;

                function _triggerBattery() {
                    $progressBar.css('width', val + '%');
                    $valBlock.animateNumber({
                        number: val,
                        numberStep: percent_number_step
                    }, 1500);
                }

                fnModule.triggerOnScroll($this, function() {
                    var interval = setInterval(function() {
                        var secundsSincePageOpen = (new Date() - pageOpenTime) / 1000;

                        if(secundsSincePageOpen > 2) {
                            clearInterval(interval);
                            fnModule.triggerOnScroll($this, _triggerBattery);
                        }
                    }, 100);
                });

            });
        }

    }

    var _animateScrollLink = function(e) {

        var $this= $(this),
            $target = $($this.attr('href')),
            event = $this.data('event');

        e.preventDefault();

        fnModule.animateScroll($target, 800);

        if (event) {
            $($target).trigger(event);
        }

    };

    var _addTriggerToAnimObjOnScroll = function() {

        var $animObj = $('.js-anim-obj');

        if ($animObj.length) {

            $animObj.each(function() {

                var $this = $(this);

                $this.imagesLoaded(function() {

                    fnModule.triggerOnScroll($this, function(e) {
                        $this.addClass('trigger');
                    });

                });

            });

        }

    }

    var _setupGallery = function() {

        var $gallery = $('.gallery');

        if ($gallery.length) {

            var $photos = $gallery.find('img');

            var $grid = $gallery.masonry({
                itemSelector: '.gallery__item',
                columnWidth: '.gallery__item',
                percentPosition: true
            });

            $gallery.imagesLoaded().progress(function() {
                $grid.masonry('layout');
            });

        }

    };

    var _textOverflowWithDots = function() {

        var $textObj = $('.js-text-overflow');

        if ($textObj.length) {

            $textObj.each(function() {

                var $obj = $(this);

                $obj.dotdotdot({
                    watch: 'window'
                });

            });

        }

    };

    var _setupInputStyler = function() {

        var $inputObj = $('.js-input-styler');

        if ($inputObj.length) {

            $inputObj.styler();

        }

    };

    var _setupCustomScroll = function() {

        var $scrollElem = $('.js-custom-scroll');

        if ($scrollElem.length) {

            $scrollElem.mCustomScrollbar({
            	mouseWheelPixels: 100,
                'theme': 'custom',
                updateOnContentResize: true,
                callbacks:{
                    onScroll: function(){
                        $(this).trigger('onScroll');
                    },
                    onTotalScroll: function(){
                        $(this).trigger('onTotalScroll');
                    },
                    onTotalScrollOffset: 200
                    
                }
            });

        }

    };

    var _setupShineMouseFollow = function() {

        var $shineMouseObj = $('.js-shine-mouse');

        if ($shineMouseObj.length) {

            $shineMouseObj.each(function(i, el) {
                $(el).text($.trim($(el).text()));
                var shine = new Shine(el);

                function handleMouseMove(event) {
                    shine.light.position.x = event.clientX;
                    shine.light.position.y = event.clientY;
                    shine.draw();
                }

                window.addEventListener('mousemove', handleMouseMove, false);
            });

        }

    };

    var _setupAnimateNum = function() {

        var $animateNum = $('.js-animate-num');

        if ($animateNum.length) {

            $animateNum.each(function(i, el) {

                $(el).animateNumber({
                    number: +$(el).text(),
                    numberStep: $.animateNumber.numberStepFactories.separator('\u00A0')
                },
                2000);

            });

        }

    }

    var _setupModal = function () {

        var $modal = $('.js-modal');

        if ($modal.length) {

            var w1,
            w2,
            diff,
            headerPaddingOrigin = $(".header").css("padding-right"),
            bodyMarginOrigin = $("body").css("margin-right"),
            wrapNotOverflowHidden;

            $(document).on('click', '.js-modal', function() {
                var el = this;
                $('#' + $(el).attr('data-modal')).arcticmodal({
                    beforeOpen: function(data, el) {
                        wrapNotOverflowHidden = $(data.wrap).css('overflow')!='hidden';

                        if (wrapNotOverflowHidden) {
                            w1 = $(data.wrap).outerWidth(true);
                            $(data.wrap).css('overflow', 'hidden');
                            w2 = $(data.wrap).outerWidth(true);
                            diff = w2 - w1;

                            $(".header").css("padding-right", diff);
                            $("body").css("margin-right", diff);
                        }
                    },
                    afterOpen: function(data, el) {
                        if ( ($('.box-modal:visible').not($(el)).length) && ($(el).attr('data-single') == 'true') ) {
                            $('.box-modal:visible').not($(el)).arcticmodal('close');
                        }
                    },
                    afterClose: function(data, el) {
                        if (!$(".box-modal:visible").length) {
                            $(data.wrap).css('overflow', 'auto');
                            $(".header").css("padding-right", headerPaddingOrigin);
                            $("body").css("margin-right", bodyMarginOrigin);
                        }
                    }
                });
            });

            $(document).on('click', '.arcticmodal-close', function() {
                $(this).closest('.box-modal').arcticmodal('close');
            });

        }
    }

    var _reasonsSlider = function() {

        var $slider = $(".js-reasons-slider");

        if ($slider.length) {
            $slider.slick({
                infinite: true,
                dots: true,
                autoplay: true,
                prevArrow: '.js-reasons-slider-nav__prev',
                nextArrow: '.js-reasons-slider-nav__next',
                appendDots: '.js-reasons-slider-pager',
                customPaging: function (slider, i) {
                    return ' ';
                }
            });
        }

    };

    var _video = function (e) {

        var tv,
            playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3, loop: 1},
            vid = [],
            $player = $('#player'),
            videoId = $player.attr('data-videoId'),
            startSeconds = $player.attr('data-startSeonds'),
            endSeconds = $player.attr('data-endSeconds'),
            suggestedQuality = $player.attr('data-suggestedQuality'),
            play = $player.attr('data-play') == 'play' ? true : false;

        vid.push({
            'videoId' : videoId,
            'startSeconds' : startSeconds,
            'endSeconds' : endSeconds,
            'suggestedQuality' : suggestedQuality,
        });
        var randomvid = Math.floor(Math.random() * (vid.length - 1 + 1));

        if ($player.length) {

            function loadPlayer() {

                if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {

                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    window.onYouTubePlayerAPIReady = function() {
                        onYouTubePlayerAPIReady();
                    };

                } else {

                    onYouTubePlayerAPIReady();

                }
            }

            loadPlayer();
        }

        function onYouTubePlayerAPIReady() {
            tv = new YT.Player('player', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
        }

        function onPlayerReady(){
            //
            // if (!play) {
            //     return;
            // }

            tv.loadVideoById(vid[randomvid]);
            tv.mute();
        }

        function onPlayerStateChange(e) {
            if (e.data === 1){
                setTimeout(function () {
                    $('.player').addClass('active');
                }, 1000);
            } else if (e.data === 0){
                tv.seekTo(vid[randomvid].startSeconds)
            }
        }

        function vidRescale(){
            if (!$player.length) {
                return;
            }

            var w = $(window).width()+200,
                h = $(window).height()+200;

            if (w/h > 16/9){
                tv.setSize(w, w/16*9);
                $('.player__screen').css({'left': '0px'});
            } else {
                tv.setSize(h/9*16, h);
                $('.player__screen').css({'left': -($('.player__screen').outerWidth()-w)/2});
            }
        }

        $(window).on('load resize', function(){
            vidRescale();
        });

    };



    exportObj.init = init;

    return exportObj;

})();
