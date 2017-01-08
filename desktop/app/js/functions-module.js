var fnModule = (function() {

    var exportObj = {};

    var init = function() {
        $.fn.typingAnimation = function(speed) {

            var
                that = this,
                text = that.data('text'),
                textArray = text.split(""),
                loopTimer,
                frameLooper;

            that.html('');

            frameLooper = function frameLooper() {

                if(textArray.length > 0) {

                    var $containerHtml = that.html();
                    that.html($containerHtml += textArray.shift());

                } else {

                    clearTimeout(loopTimer);
                    return false;

                }

                loopTimer = setTimeout(frameLooper, speed);

            }

            frameLooper();

            return this;

        }

        // добавляем перевод для datepicker
        jQuery.extend(jQuery.fn.pickadate.defaults, {
            monthsFull: [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
            monthsShort: [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек' ],
            weekdaysFull: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
            weekdaysShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ],
            today: 'сегодня',
            clear: 'удалить',
            close: 'закрыть',
            firstDay: 1,
            format: 'd mmmm yyyy г.',
            formatSubmit: 'yyyy/mm/dd'
        });

    };

    var isVisible = function($elem) {

        var elem = $elem.get(0),
            coords = elem.getBoundingClientRect(),
            windowHeight = document.documentElement.clientHeight;

        // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
        var topVisible = coords.top > 0 && coords.top < windowHeight,
            bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

        return topVisible || bottomVisible;
    };

    // Когда элемент (первый аргумент) в пределах видимости, запускается функция, переданная вторым аргументом
    var triggerOnScroll = function($elem, func) {

        var _runTrigger = function(e) {

            if (isVisible($elem)) {
                func();
                $(document).off('scroll', _runTrigger);
            }

        }

        $(document).on('scroll', _runTrigger);
        _runTrigger();

    }

    // узнать ширину скроллбара в данном браузере
    var _measureScrollBarWidth = function() {

        var div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        // при display:none размеры нельзя узнать
        // нужно, чтобы элемент был видим,
        // visibility:hidden - можно, т.к. сохраняет геометрию
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        var scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return scrollWidth;

    }

    var toggleZoom = function(state) {

        var _zoomDisable = function() {
            $('head meta[name=viewport]').remove();
            $('head').prepend('<meta name="viewport" content="user-scalable=0" />');
        }

        var _zoomEnable = function() {
            $('head meta[name=viewport]').remove();
            $('head').prepend('<meta name="viewport" content="user-scalable=1" />');
        }

        if (state === true) {
            _zoomEnable();

        } else if(state === false) {

            _zoomDisable();
        }

    }


    // Спрятать или показать скроллбар
    var toggleScrollBar = function(selector, action) {

        var scrollBarWidth = _measureScrollBarWidth(),
            $elem = $(selector);

        var _hideScrollBar = function() {
            $elem
                .addClass('no-scroll')
                .css({
                    'padding-right': scrollBarWidth + 'px'
                });
        };

        var _showScrollBar = function() {
            $elem
                .removeClass('no-scroll')
                .css({
                    'padding-right': ''
                });
        }

        switch (action) {

            case 'show':
                _showScrollBar();
                break;

            case 'hide':
                _hideScrollBar();
                break;

            default:
                if ($elem.hasClass('no-scroll')) {
                    _showScrollBar();

                } else {

                    _hideScrollBar();
                }
        }

    }

    var positionTo = function($elem, pos) {

        var elemHeight = $elem.outerHeight(),
            elemWidth = $elem.outerWidth(),
            windowWidth = document.documentElement.clientWidth,
            windowHeight = document.documentElement.clientHeight,
            elemPos = $elem.get(0).getBoundingClientRect(),
            elemCenterX = elemPos.left + elemWidth / 2,
            elemCenterY = elemPos.top + elemHeight / 2;

        switch(pos) {
            case 'center':
                $elem.css({
                    'top': windowHeight / 2 - elemCenterY + 'px',
                    'left': windowWidth / 2 - elemCenterX +'px'
                });
                break;

            case 'top':
                $elem.css({
                    'top': 50 - elemPos.top + 'px'
                });
                break;
        }

    };

    var animateScroll = function($target, speed) {

        var targetTopPos = $target.offset().top,
            speed = speed || 500,
            $fixedHeader = $('.header'),
            scrollTo = targetTopPos - $fixedHeader.outerHeight();

        $('html, body').animate({scrollTop: scrollTo}, speed);

    }

    var umodal = function(title, text, markup, single) {
        var $umodal = $('#umodal');

        if ($umodal.length) {
            var $title = $umodal.find('.box-modal__title'),
                $body = $umodal.find('.box-modal__content-item'),
                $text;

            $title.text('');
            $body.html('<div class="box-modal__text"><p class="box-modal__text-par"></p></div>');

            $text = $umodal.find('.box-modal__text-par');
            $umodal.removeAttr('data-single');

            if (single) {
                if ( ($('.box-modal:visible').not($umodal).length) ) {
                    $('.box-modal:visible').not($umodal).arcticmodal('close');
                }
            }

            if (title != undefined && title != '') {
                $title.text(title);
            } else {
                $title.html('&nbsp;');
            }

            if (markup) {
                $body.html(text);
            } else {
                $text.text(text);
            }

            $umodal.arcticmodal();
        }
    }

    exportObj.init = init;
    exportObj.isVisible = isVisible;
    exportObj.toggleScrollBar = toggleScrollBar;
    exportObj.positionTo = positionTo;
    exportObj.triggerOnScroll = triggerOnScroll;
    exportObj.toggleZoom = toggleZoom;
    exportObj.animateScroll = animateScroll;
    exportObj.umodal = umodal;

    return exportObj;

})();
