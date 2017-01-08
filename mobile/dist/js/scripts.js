(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function() {

    var app      = require('./modules/app'),
        donation = require('./modules/donation'),
        select   = require('./modules/select'),
        like     = require('./modules/like'),
        slider   = require('./modules/slider'),
        addPhoto = require('./modules/add-photo'),
        tabs     = require('./modules/tabs'),
        toggle   = require('./modules/toggle'),
        burgerBtn = require('./modules/burger-btn'),
        header   = require('./modules/header'),
        customInput = require('./modules/custom-input'),
        maskedInput = require('./modules/masked-input'),
        popup    = require('./modules/popup'),
        battery  = require('./modules/battery'),
        supporter = require('./modules/supporter'),
        datepicker = require('./modules/datepicker');


    app.init();
    donation.init();
    select.init();
    tabs.init();
    like.init();
    slider.init();
    addPhoto.init();
    toggle.init();
    header.init();
    customInput.init();
    maskedInput.init();
    popup.init();
    battery.init();
    supporter.init();
    datepicker.init();

});

},{"./modules/add-photo":4,"./modules/app":5,"./modules/battery":6,"./modules/burger-btn":7,"./modules/custom-input":8,"./modules/datepicker":9,"./modules/donation":10,"./modules/header":11,"./modules/like":12,"./modules/masked-input":13,"./modules/popup":14,"./modules/select":15,"./modules/slider":16,"./modules/supporter":17,"./modules/tabs":18,"./modules/toggle":19}],2:[function(require,module,exports){
module.exports = function($elem) {

    var elem = $elem.get(0),
        coords = elem.getBoundingClientRect(),
        windowHeight = document.documentElement.clientHeight;

    // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
    var topVisible = coords.top > 0 && coords.top < windowHeight,
        bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;

};

},{}],3:[function(require,module,exports){
var isVisible = require('./is-visible');

// Когда элемент (первый аргумент) в пределах видимости, запускается функция, переданная вторым аргументом
module.exports = function($elem, func) {

    var _runTrigger = function(e) {

        if (isVisible($elem)) {
            func();
            $(document).off('scroll', _runTrigger);
        }

    }

    $(document).on('scroll', _runTrigger);
    _runTrigger();

}

},{"./is-visible":2}],4:[function(require,module,exports){
'use strict';

var init = function () {
    _addListenFile();
    _addRemoveFile();
};

/**
 * При первом запуске проверяет, поддерживает ли браузер FileReader API и в зависимости от этого
 * переопределяет себя
 *
 * @param {Object} options Объект с настройками
 * @param {HTMLElement} options.input input из которого берется загружаемый файл
 * @param  {fileReaderCallback} options.fileReaderEnabled Функция вызываемая, после того как FileReader загрузит файл
 * @param {notFileReaderCallback} options.fileReaderDisabled Сумма Функция вызываемая, если FileReader API не доступно
 */

 /**
 * Callbacks для uploadPhoto.
 *
 * @callback fileReaderCallback
 * @param {Object} e - объект event события FileReader.onload
 *
 * @callback notFileReaderCallback
 * @param {Object} e - объект event события input.change
 */

var uploadPhoto = function() {

    if (window.File && window.FileReader && window.FileList && window.Blob) {

        uploadPhoto = function(options) {
            for (var i = 0; i < options.input.files.length; i++) {
                var reader = new FileReader;

                reader.readAsDataURL( options.input.files[i] );
                reader.onload = function (e) { // Как только картинка загрузится
                    if (typeof options.fileReaderEnabled === 'function') {
                        options.fileReaderEnabled(e);
                    }
                };
            }
        };

    } else {

        uploadPhoto = function(options) {
            if (typeof options.fileReaderDisabled === 'function') {
                options.fileReaderDisabled();
            }
        }
    }
};

uploadPhoto();

var _getFileName = function(input) {
    var val = input.value;

    if (!val) return false;

    val = val.split('\\');

    return val[val.length - 1];
};

var _addListenFile = function () {

    $('.js-avatar-upload').on('change', function(e) {

        var $this = $(this),
            $wrapper = $this.closest('.add-photo'),
            $ava = $wrapper.find('.add-photo__avatar');

        uploadPhoto({
            input: this,

            fileReaderEnabled: function(e) {
                $ava.attr({
                    src: e.target.result,
                    srcset: e.target.result + ' 2x'
                });
                $wrapper.addClass('add-photo_uploaded');
            },

            fileReaderDisabled: function() {
                var fileName = _getFileName(e.target);

                if (!fileName) return;

                $wrapper.addClass('add-photo_uploaded');

                $ava.attr({
                    src: '',
                    alt: fileName
                });
            }
        });

    });

    $('body').on('change', '.js-upload-photo', function (e) {

        var $this = $(this),
            $inputClone = $this.clone(),
            $template = $(
                '<li class="add-photo__item-wrapper">' +
                    '<div class="user-photo add-photo__item">' +
                        '<div class="user-photo__img-wrapper"><img src="" ' +
                            ' class="user-photo__img add-photo__img" alt="" role="presentation">' +
                        '</div>' +
                        '<button title="Удалить фотографию" class="user-photo__remove">Удалить фотографию' +
                        '</button>' +
                    '</div>' +
                '</li>');

        $this.after($inputClone);

        uploadPhoto({
            input: this,

            fileReaderEnabled: function(e) {
                $template.find('.add-photo__img').attr('src', e.target.result);
                $('.add-photo__list').prepend($template);

                _addRemoveFile($template.find('.user-photo__remove'));


                $template.find('.add-photo__item').append($this);

                
                // $this.val('');
            },

            fileReaderDisabled: function() {
                var fileName = _getFileName(e.target);

                if (!fileName) return;

                $template.find('.user-photo__img').attr({
                    'alt': fileName,
                    'src': ''
                });

                $this.closest('.add-photo__item-wrapper').before($template);

                _addRemoveFile($template.find( '.user-photo__remove' ));

                $this.val('');
            }
        });
    });

    $('body').on('change', '.js-upload-photo-simple', function (e) {
        var $this = $(this),
            $inputClone = $this.clone(),
            $template = $(
                '<li class="add-photo__item-wrapper add-photo__item-wrapper_change">' +
                '<div class="user-photo add-photo__item">' +
                '<div class="user-photo__img-wrapper"><img src="" ' +
                ' class="user-photo__img add-photo__img" alt="" role="presentation">' +
                '</div>' +
                '<button title="Удалить фотографию" class="user-photo__remove">Удалить фотографию' +
                '</button>' +
                '</div>' +
                '</li>');

        $this.after($inputClone);

        uploadPhoto({
            input: this,

            fileReaderEnabled: function(e) {
                $template.find('.add-photo__img').attr('src', e.target.result);
                if ($('.add-photo__item-wrapper_change').length) {
                    $('.add-photo__list').find('.add-photo__item-wrapper_change').replaceWith($template);
                } else {
                    $('.add-photo__list').prepend($template);
                }

                _addRemoveFile($template.find('.user-photo__remove'));

                $template.find('.add-photo__item').append($this);
            },

            fileReaderDisabled: function() {
                var fileName = _getFileName(e.target);

                if (!fileName) return;

                $template.find('.user-photo__img').attr({
                    'alt': fileName,
                    'src': ''
                });

                $this.closest('.add-photo__item-wrapper').before($template);

                _addRemoveFile($template.find( '.user-photo__remove' ));

                $this.val('');
            }
        });
    });
};

var _addRemoveFile = function ( btn ) {

    var remove = function ( btn ) {
        btn.closest('.add-photo__item-wrapper').remove();
        btn.closest('.cabinet__user-photo').remove();
    };

    if ( btn ) {
        btn.on( 'click', function (event) {
            event.preventDefault();
            remove($( this ));
        } );
        return;
    }

    var blocks = $('.user-photo__remove');

    blocks.on('click', function (event) {
        event.preventDefault();
        remove($( this ));
    } );

};

module.exports = {
    init: init
}

},{}],5:[function(require,module,exports){
module.exports = {
    init: function() {
        window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfillHacks
        });
        svg4everybody();
    }
};

},{}],6:[function(require,module,exports){
var triggerOnScroll = require('../functions/trigger-on-scroll'),
    pageOpenTime = new Date();

function initBattery($battery) {
    var $battery = $battery || $('.battery'),
        percent_number_step = $.animateNumber.numberStepFactories.append('%');

    if ($battery.length) {
        $battery.each(function() {

            var $this = $(this),
                val = parseInt($this.data('val')),
                $progressBar = $this.find('.battery__progress'),
                $valBlock = $this.find('.battery__val');

            function _triggerBattery() {
                $progressBar.css('width', val + '%');
                $valBlock.animateNumber({
                    number: val,
                    numberStep: percent_number_step
                }, 2000);
            }

            triggerOnScroll($this, function() {
                var interval = setInterval(function() {
                    var secundsSincePageOpen = (new Date() - pageOpenTime) / 1000;

                    if(secundsSincePageOpen > 3) {
                        clearInterval(interval);
                        triggerOnScroll($this, _triggerBattery);
                    }
                }, 100);
            });

        });
    }
}

$(document).on('battery-loaded', function () {
    initBattery();
} );

module.exports = {
    init: initBattery
};

},{"../functions/trigger-on-scroll":3}],7:[function(require,module,exports){
$burgerBtn = $('.burger-btn');

function _clickEvent(e) {
    e.preventDefault();

    $(this).toggleClass('burger-btn_active');
}

$burgerBtn.on('click', _clickEvent);

},{}],8:[function(require,module,exports){
function _tilingInputChange(e) {

    var $this = $(this),
        $target = $(e.target),
        $inputs = $this.find('.custom-input__hidden'),
        $userVal = $this.find('.custom-input_user-val .custom-input__label'),
        $userValInput = $target.closest('.custom-input_user-val');

    if ($userValInput.length) {
        $inputs.filter(':checked').removeAttr('checked');
        $userVal.addClass('custom-input__label_has-val');

        if ($inputs.attr('required')) {
            $inputs.removeAttr('required');
            $userVal.attr('required', '');
        }

    } else {

        $userVal
            .val('')
            .removeClass('custom-input__label_has-val');

        if ($userVal.attr('required')) {
            $userVal.removeAttr('required');
            $inputs.attr('required', '');
        }
    }

}

module.exports = {
    init: function() {
        var $tilingInputsContainer = $('.tiling-inputs');

        if ($tilingInputsContainer.length) {
            $tilingInputsContainer.on('change', _tilingInputChange);
        }
    }
};

},{}],9:[function(require,module,exports){
jQuery.extend(jQuery.fn.pickadate.defaults, {
    monthsFull: [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
    monthsShort: [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек' ],
    weekdaysFull: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
    weekdaysShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ],
    today: 'сегодня',
    clear: 'удалить',
    close: 'закрыть',
    firstDay: 1,
    format: 'dd.mm.yyyy',
    formatSubmit: 'yyyy/mm/dd'
});

function init($datepicker) {
    $datepicker = $datepicker || $('.datepicker');

    $datepicker.each(function() {

        var $this = $(this),
            $input = $this.find('.datepicker__input'),
            $pickerContainer = $this.find('.picker');

        $input.pickadate({
            onOpen: function() {
                $('body').addClass('hidden-fixed');
                $input.addClass('datepicker__input_hidden');
            },
            onClose: function() {
                $('body').removeClass('hidden-fixed');
                $input.removeClass('datepicker__input_hidden');
            }
        });

    });
}

module.exports = {
    init: init
}

},{}],10:[function(require,module,exports){
var $donation = $('.donation'),
    $donationForm = $donation.find('.donation__form'),
    $screens = $donation.find('.donation__screen'),
    $steps = $donation.find('.donation__step'),
    $nextBtn = $donation.find('.donation__btn-next'),
    $methodRadio = $('.donation__payment_method :radio'),
    $donationLabel = $('.donation__label_payment'),
    $typeRadio = $('.donation__payment_type :radio'),
    $isAgree = $('#donation-is_agree'),
    //$submitBtn = $donation.find('.btn[type="submit"]'),
    $submitBtn = $donation.find('.btn__donation--finish');
    $loginBtn = $('.form__row_socials .auth-soc__socials .socials__link');
    currentStep = 0,
    customInputModule = require('./custom-input'),
    selectModule = require('./select');

var init = function() {
    _setupListeners();

    _typeChangeListener();
};
 
var _saveForm = function() {
    var form = JSON.stringify($('.donation').find('form').serializeArray());
    $.cookie('donation-form', form, {expires: 1, path: '/'});
    
} 

var _setupListeners = function() {

    if ($donation.length) {
        $donation.on('click', _clickListener);
    }
    
    if ($loginBtn.length) {
        $(document).on('click', '.form__row_socials .auth-soc__socials .socials__link', function(e) {
            _saveForm();
        });
    }
    $(document).on('set_step', '.donation', function() {
        $('a[href="#next"]').click();
        $('a[href="#next"]').click();
    });
};

var _typeChangeListener = function() {
    if ($methodRadio.length) {

        var curType = $typeRadio.filter('.custom-input__hidden:checked').val();

        $methodRadio.parent().hide();
        $donationLabel.hide();

        $donationLabel.filter('.type-' + curType).show();

        $('.form__row.type').hide();
        $('.form__row.type').find('input').removeAttr('required');
        
        $donationLabel.filter('.type-' + curType).show();
        $('.form__row.type-' + curType).show();
        $('.form__row.type-' + curType).find('input').attr('required', 'required');

        $methodRadio.parent().filter('.type-' + curType).show()
            .find(':radio').eq(0).prop('checked', true);
    }
};

var setStep = function(num) {
    var $screenActive = $screens.filter('.donation__screen_active'),
        $newScreen = $screens.eq(num);

    if ($newScreen.is($screenActive)) {
        return;
    }

    $screenActive.removeClass('donation__screen_active');
    $newScreen
        .fadeIn(400, function() {
            $newScreen
                .addClass('donation__screen_active')
                .css({
                    'opacity': '',
                    'display': ''
                });
        });

    $steps
        .removeClass('donation__step_active')
        .eq(num)
        .addClass('donation__step_active');

    fnModule.animateScroll($('.main'));
}

var _clickListener = function(e) {

    var $this = $(this),
        $target = $(e.target),
        $prevBtnClicked = $target.closest('.donation__btn-prev'),
        $nextBtnClicked = $target.closest('.donation__btn-next');

    if ($nextBtnClicked.length) {
        e.preventDefault();
        setStep(++currentStep);
    }

    if ($prevBtnClicked.length) {
        e.preventDefault();
        setStep(--currentStep);
    }

};
function _setupSteps() {

    var $main = $donation.find('.donation__main');

    $main.steps({
        headerTag: '.donation__step-name',
        bodyTag: '.donation__step-body',
        forceMoveForward: true,
        transitionEffect: 'fade',
        labels: {
            next: 'Перейти к выбору способа оплаты',
            finish: 'Оплатить'
        },

        onInit: function(e, current) {

            var $buttons = $main.find('.actions a');

            $submitBtn = $donation.find('.btn__donation--finish');
            $submitBtn.hide();
            
            $buttons.addClass('btn btn_size_wide btn_light');
            customInputModule.init();
        },

        onStepChanged: function(e, curInd) {
            var $isAgree = $donation.find('input[name="is_agree"]'),
                $submitBtn = $donation.find('.btn__donation--finish');

            if ($isAgree.length) {
                $isAgree.on('input change', function(e) {
                    if ($isAgree.prop('checked')) {
                        $submitBtn.removeClass('btn_disabled');
                        $submitBtn.removeAttr('disabled');
                    } else {
                        $submitBtn.addClass('btn_disabled');
                        $submitBtn.attr('disabled', 'disabled');
                    }
                });
            }

            var $nextBtn = $main.find('.actions a[href="#next"]');
            var $finishBtn = $main.find('.actions a[href="#finish"]');
            $finishBtn.hide();
            $submitBtn.hide();
            if (curInd === 1) {
                $nextBtn.text('Перейти к оплате');
            } else if(curInd === 2) {
                $nextBtn.hide();
                $submitBtn.show();
            }

            customInputModule.init();
        },

        onFinished: function(e) {

            var $finish = $donation.find('.donation__finish'),
                $title = $donation.find('.donation__title'),
                $submitBtn = $donation.find('.btn__donation--finish');

            $submitBtn.hide();
            //$finish.addClass('donation__finish_visible');
            $(document).scrollTop(0);
            $title.hide();
            $main.hide();
        }

    });

}

var _setupInputPhoneMask = function() {
    $('.js-input-phone-mask').mask('+7(999) 999-99-99');
};

module.exports = {
    init: function() {
        if ($donation.length) {
            _setupListeners();
            _typeChangeListener();
            _setupSteps();
            _setupInputPhoneMask();

            $('.donation__payment_type').find(':radio').on('change', function() {
                _typeChangeListener();

                $('.donation__payment_method').hide();
                $('.type-' + $(this).val()).show();
            });
        }
    },
    setStep: function() {
        setStep();
    }
};
},{"./custom-input":8,"./select":15}],11:[function(require,module,exports){
var $header = $('.header'),
    $burgerBtn = $('.header__burger'),
    $searchBtn = $('.search__icon-wrapper'),
    $searchFormHeader = $('.menu__search'),
    $logoHeader = $('.header__logo');

function openMenu() {
    $header.toggleClass('header_menu-opened');
    $('body').toggleClass('hidden-fixed');
}

function _setupListeners() {
    $burgerBtn.on('click', openMenu);
}

module.exports = {
    init: function() {
        _setupListeners();
    },

    openMenu: openMenu
};

$searchFormHeader.click(function () {
    $searchFormHeader.addClass('menu__search_active');
    $logoHeader.addClass('hidden-text');

    $(document).mouseup(function (e) {
        if (!$searchFormHeader.is(e.target) && $searchFormHeader.has(e.target).length === 0 && $logoHeader.has(e.target).length === 0 && !$logoHeader.is(e.target)) {
            $searchFormHeader.removeClass('menu__search_active');
            setTimeout(function () {
                $logoHeader.removeClass('hidden-text');
            }, 350);
        }
    });
});

},{}],12:[function(require,module,exports){
'use strict';

var _setupLikeBtn = function(e) {
    var $this = $(this);

    e.preventDefault();

    if (userAuth) {
        $this.toggleClass('like_active');
    }
};

module.exports = {
    init: function() {
        $(document).on('click', '.like', _setupLikeBtn);
    }
}
},{}],13:[function(require,module,exports){
function init($input) {
    $input = $input || $('.js-masked-input');

    if ($input.length) {
        $input.each(function() {

            var $this = $(this),
                mask = $this.data('mask') + '',
                placeholder = $this.data('mask-placeholder') || '_';

            $this.mask(mask, { placeholder: placeholder });

        });
    }
}

module.exports = {
    init: init
}

},{}],14:[function(require,module,exports){
function init() {

    var $popups = $('.popup');

    if ($popups.length) {
        $popups.remodal();
    }

}

module.exports = {
    init: init
}

},{}],15:[function(require,module,exports){
'use strict';

function init($select) {

    $select = $select ? $select : $('.select');

    if ($select.length) {
        $select.styler();
    }
};

module.exports = {
    init: init
}

},{}],16:[function(require,module,exports){
'use strict';

var $sliders = $('.slider');

function _setupSliders() {
    initSliders();

    $sliders.on('slider:items-added', function() {
        initSliders($(this), true);
    });
}

function initSliders($targetSliders, reinit) {
    $targetSliders = $targetSliders || $sliders;

    $targetSliders.each(function () {
        var $this = $(this),
            dots = $this.data('dots'),
            arrows = $this.data('arrows'),
            centerMode = $this.data('center'),
            variableWidth = $this.data('css-width');

        if (reinit) {
            $this.slick('unslick');
            $this.find('[aria-describedby^="slick-slide"]').remove();
        }

        $this.slick({
            arrows: arrows,
            dots: dots,
            mobileFirst: true,
            centerMode: centerMode,
            variableWidth: variableWidth
        });
    });
}

module.exports = {
    init: function() {
        if ($sliders.length) {
            _setupSliders();
        }
    },

    initSliders: initSliders
}

},{}],17:[function(require,module,exports){
var _rollOutSupporterDesc = function(e) {
    var $this = $(this),
        $block = $this.closest('.supporter');

    $block.toggleClass('supporter_open');
};

module.exports = {
    init: function() {
        $(document).on('click', '.supporter__switch', _rollOutSupporterDesc);
    }
}

},{}],18:[function(require,module,exports){
'use strict'

var $tabs = $('.tabs');

var _init = function() {
    var $target = $tabs.find('[data-href=' + window.location.hash.split('#')[1] + ']');

    $target.click();
}

var _setupListeners = function() {

    var _clickEvent = function(e) {

        var $tabs = $(this),
            $target = $(e.target),
            $navItem = $target.closest('.tabs__nav-item');

        if ($navItem.length) {

            e.preventDefault();

            if ($navItem.hasClass('tabs__nav-item_active')) {
                return;
            }

            var $firstPanel = $tabs.find('.tabs__panel').first(),
            $panels = $firstPanel.add($firstPanel.siblings('.tabs__panel')),
                targetPanel = $navItem.data('tab');

            $navItem
                .addClass('tabs__nav-item_active')
                .siblings()
                .removeClass('tabs__nav-item_active');

            $panels
                .removeClass('tabs__panel_active')
                .filter('[data-tab=' + targetPanel + ']')
                .addClass('tabs__panel_active');

        }

    };

    var _clickLinkEvent = function(e) {
        var $target = $tabs.find('[data-href=' + $(this).attr('href').split('#')[1] + ']');

        $target.click();
    }

    $tabs.on('click', _clickEvent);
    $tabs.on('click', '.js-open-tab', _clickLinkEvent);
};

module.exports = {
    init: function() {
        if ($tabs.length) {
            _setupListeners();
            _init();
        }
    }
}

},{}],19:[function(require,module,exports){
var $toggleWrapper = $('.js-toggle-wrapper');

var _setupListeners = function() {

    var _clickEvent = function(e) {

        var $wrap = $(this),
            $target = $(e.target),
            $btn = $target.closest('.js-toggle-btn');

        if ($btn.length) {

            if ($wrap.hasClass("js-toggle-wrapper_open")) {
                history.pushState('', document.title, window.location.pathname);
                $wrap.removeClass("js-toggle-wrapper_open");
            } else {
                var id = $wrap.attr('id');

                $wrap.removeAttr('id');
                location.hash = id;
                $wrap.attr('id', id);
                $wrap.addClass("js-toggle-wrapper_open");
            }

            e.preventDefault();
        }

    };

    $toggleWrapper.on('click', _clickEvent);
};

var _toggleOnPageOpen = function() {

    if ($toggleWrapper.length) {
        var hash = location.hash,
            $targetToggle = $toggleWrapper.filter(hash);

        if ($targetToggle.length) {
            $targetToggle.toggleClass('js-toggle-wrapper_open');
        }
    }

};

var _toggleOnActOpen = function() {

    var btnActOpen = $('.js-fund-acts');

    if (btnActOpen.length) {

        btnActOpen.click(function (e) {
            e.preventDefault();

            var $this = $(this),
                $paren = $this.closest('.fund');

            $paren.toggleClass('active');

        })
    }

};

module.exports = {
    init: function() {
        _setupListeners();
        _toggleOnPageOpen();
        _toggleOnActOpen();
    }
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9mYWtlXzc4Mjk1MDVlLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9mdW5jdGlvbnMvaXMtdmlzaWJsZS5qcyIsIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9hcHAvanMvZnVuY3Rpb25zL3RyaWdnZXItb24tc2Nyb2xsLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9tb2R1bGVzL2FkZC1waG90by5qcyIsIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9hcHAvanMvbW9kdWxlcy9hcHAuanMiLCIvc3J2L3NpdGVzL2RvaXQvby5uYWdvcm5vdi5kb2l0LmRldi5kaWdpdGFsd2FuZC5ydS9mcm9udGVuZC90aGVtZXMvbW9iaWxlL2Fzc2V0cy9tYXJrdXAvYXBwL2pzL21vZHVsZXMvYmF0dGVyeS5qcyIsIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9hcHAvanMvbW9kdWxlcy9idXJnZXItYnRuLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9tb2R1bGVzL2N1c3RvbS1pbnB1dC5qcyIsIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9hcHAvanMvbW9kdWxlcy9kYXRlcGlja2VyLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9tb2R1bGVzL2RvbmF0aW9uLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9tb2R1bGVzL2hlYWRlci5qcyIsIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9hcHAvanMvbW9kdWxlcy9saWtlLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9tb2R1bGVzL21hc2tlZC1pbnB1dC5qcyIsIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9hcHAvanMvbW9kdWxlcy9wb3B1cC5qcyIsIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9hcHAvanMvbW9kdWxlcy9zZWxlY3QuanMiLCIvc3J2L3NpdGVzL2RvaXQvby5uYWdvcm5vdi5kb2l0LmRldi5kaWdpdGFsd2FuZC5ydS9mcm9udGVuZC90aGVtZXMvbW9iaWxlL2Fzc2V0cy9tYXJrdXAvYXBwL2pzL21vZHVsZXMvc2xpZGVyLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9tb2R1bGVzL3N1cHBvcnRlci5qcyIsIi9zcnYvc2l0ZXMvZG9pdC9vLm5hZ29ybm92LmRvaXQuZGV2LmRpZ2l0YWx3YW5kLnJ1L2Zyb250ZW5kL3RoZW1lcy9tb2JpbGUvYXNzZXRzL21hcmt1cC9hcHAvanMvbW9kdWxlcy90YWJzLmpzIiwiL3Nydi9zaXRlcy9kb2l0L28ubmFnb3Jub3YuZG9pdC5kZXYuZGlnaXRhbHdhbmQucnUvZnJvbnRlbmQvdGhlbWVzL21vYmlsZS9hc3NldHMvbWFya3VwL2FwcC9qcy9tb2R1bGVzL3RvZ2dsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYXBwICAgICAgPSByZXF1aXJlKCcuL21vZHVsZXMvYXBwJyksXHJcbiAgICAgICAgZG9uYXRpb24gPSByZXF1aXJlKCcuL21vZHVsZXMvZG9uYXRpb24nKSxcclxuICAgICAgICBzZWxlY3QgICA9IHJlcXVpcmUoJy4vbW9kdWxlcy9zZWxlY3QnKSxcclxuICAgICAgICBsaWtlICAgICA9IHJlcXVpcmUoJy4vbW9kdWxlcy9saWtlJyksXHJcbiAgICAgICAgc2xpZGVyICAgPSByZXF1aXJlKCcuL21vZHVsZXMvc2xpZGVyJyksXHJcbiAgICAgICAgYWRkUGhvdG8gPSByZXF1aXJlKCcuL21vZHVsZXMvYWRkLXBob3RvJyksXHJcbiAgICAgICAgdGFicyAgICAgPSByZXF1aXJlKCcuL21vZHVsZXMvdGFicycpLFxyXG4gICAgICAgIHRvZ2dsZSAgID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RvZ2dsZScpLFxyXG4gICAgICAgIGJ1cmdlckJ0biA9IHJlcXVpcmUoJy4vbW9kdWxlcy9idXJnZXItYnRuJyksXHJcbiAgICAgICAgaGVhZGVyICAgPSByZXF1aXJlKCcuL21vZHVsZXMvaGVhZGVyJyksXHJcbiAgICAgICAgY3VzdG9tSW5wdXQgPSByZXF1aXJlKCcuL21vZHVsZXMvY3VzdG9tLWlucHV0JyksXHJcbiAgICAgICAgbWFza2VkSW5wdXQgPSByZXF1aXJlKCcuL21vZHVsZXMvbWFza2VkLWlucHV0JyksXHJcbiAgICAgICAgcG9wdXAgICAgPSByZXF1aXJlKCcuL21vZHVsZXMvcG9wdXAnKSxcclxuICAgICAgICBiYXR0ZXJ5ICA9IHJlcXVpcmUoJy4vbW9kdWxlcy9iYXR0ZXJ5JyksXHJcbiAgICAgICAgc3VwcG9ydGVyID0gcmVxdWlyZSgnLi9tb2R1bGVzL3N1cHBvcnRlcicpLFxyXG4gICAgICAgIGRhdGVwaWNrZXIgPSByZXF1aXJlKCcuL21vZHVsZXMvZGF0ZXBpY2tlcicpO1xyXG5cclxuXHJcbiAgICBhcHAuaW5pdCgpO1xyXG4gICAgZG9uYXRpb24uaW5pdCgpO1xyXG4gICAgc2VsZWN0LmluaXQoKTtcclxuICAgIHRhYnMuaW5pdCgpO1xyXG4gICAgbGlrZS5pbml0KCk7XHJcbiAgICBzbGlkZXIuaW5pdCgpO1xyXG4gICAgYWRkUGhvdG8uaW5pdCgpO1xyXG4gICAgdG9nZ2xlLmluaXQoKTtcclxuICAgIGhlYWRlci5pbml0KCk7XHJcbiAgICBjdXN0b21JbnB1dC5pbml0KCk7XHJcbiAgICBtYXNrZWRJbnB1dC5pbml0KCk7XHJcbiAgICBwb3B1cC5pbml0KCk7XHJcbiAgICBiYXR0ZXJ5LmluaXQoKTtcclxuICAgIHN1cHBvcnRlci5pbml0KCk7XHJcbiAgICBkYXRlcGlja2VyLmluaXQoKTtcclxuXHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRlbGVtKSB7XHJcblxyXG4gICAgdmFyIGVsZW0gPSAkZWxlbS5nZXQoMCksXHJcbiAgICAgICAgY29vcmRzID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICB3aW5kb3dIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG5cclxuICAgIC8vINCy0LXRgNGF0L3Rj9GPINCz0YDQsNC90LjRhtCwIGVsZW0g0LIg0L/RgNC10LTQtdC70LDRhSDQstC40LTQuNC80L7RgdGC0Lgg0JjQm9CYINC90LjQttC90Y/RjyDQs9GA0LDQvdC40YbQsCDQstC40LTQuNC80LBcclxuICAgIHZhciB0b3BWaXNpYmxlID0gY29vcmRzLnRvcCA+IDAgJiYgY29vcmRzLnRvcCA8IHdpbmRvd0hlaWdodCxcclxuICAgICAgICBib3R0b21WaXNpYmxlID0gY29vcmRzLmJvdHRvbSA8IHdpbmRvd0hlaWdodCAmJiBjb29yZHMuYm90dG9tID4gMDtcclxuXHJcbiAgICByZXR1cm4gdG9wVmlzaWJsZSB8fCBib3R0b21WaXNpYmxlO1xyXG5cclxufTtcclxuIiwidmFyIGlzVmlzaWJsZSA9IHJlcXVpcmUoJy4vaXMtdmlzaWJsZScpO1xyXG5cclxuLy8g0JrQvtCz0LTQsCDRjdC70LXQvNC10L3RgiAo0L/QtdGA0LLRi9C5INCw0YDQs9GD0LzQtdC90YIpINCyINC/0YDQtdC00LXQu9Cw0YUg0LLQuNC00LjQvNC+0YHRgtC4LCDQt9Cw0L/Rg9GB0LrQsNC10YLRgdGPINGE0YPQvdC60YbQuNGPLCDQv9C10YDQtdC00LDQvdC90LDRjyDQstGC0L7RgNGL0Lwg0LDRgNCz0YPQvNC10L3RgtC+0LxcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkZWxlbSwgZnVuYykge1xyXG5cclxuICAgIHZhciBfcnVuVHJpZ2dlciA9IGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICAgICAgaWYgKGlzVmlzaWJsZSgkZWxlbSkpIHtcclxuICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ3Njcm9sbCcsIF9ydW5UcmlnZ2VyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLCBfcnVuVHJpZ2dlcik7XHJcbiAgICBfcnVuVHJpZ2dlcigpO1xyXG5cclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIF9hZGRMaXN0ZW5GaWxlKCk7XHJcbiAgICBfYWRkUmVtb3ZlRmlsZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqINCf0YDQuCDQv9C10YDQstC+0Lwg0LfQsNC/0YPRgdC60LUg0L/RgNC+0LLQtdGA0Y/QtdGCLCDQv9C+0LTQtNC10YDQttC40LLQsNC10YIg0LvQuCDQsdGA0LDRg9C30LXRgCBGaWxlUmVhZGVyIEFQSSDQuCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0Y3RgtC+0LPQvlxyXG4gKiDQv9C10YDQtdC+0L/RgNC10LTQtdC70Y/QtdGCINGB0LXQsdGPXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zINCe0LHRitC10LrRgiDRgSDQvdCw0YHRgtGA0L7QudC60LDQvNC4XHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG9wdGlvbnMuaW5wdXQgaW5wdXQg0LjQtyDQutC+0YLQvtGA0L7Qs9C+INCx0LXRgNC10YLRgdGPINC30LDQs9GA0YPQttCw0LXQvNGL0Lkg0YTQsNC50LtcclxuICogQHBhcmFtICB7ZmlsZVJlYWRlckNhbGxiYWNrfSBvcHRpb25zLmZpbGVSZWFkZXJFbmFibGVkINCk0YPQvdC60YbQuNGPINCy0YvQt9GL0LLQsNC10LzQsNGPLCDQv9C+0YHQu9C1INGC0L7Qs9C+INC60LDQuiBGaWxlUmVhZGVyINC30LDQs9GA0YPQt9C40YIg0YTQsNC50LtcclxuICogQHBhcmFtIHtub3RGaWxlUmVhZGVyQ2FsbGJhY2t9IG9wdGlvbnMuZmlsZVJlYWRlckRpc2FibGVkINCh0YPQvNC80LAg0KTRg9C90LrRhtC40Y8g0LLRi9C30YvQstCw0LXQvNCw0Y8sINC10YHQu9C4IEZpbGVSZWFkZXIgQVBJINC90LUg0LTQvtGB0YLRg9C/0L3QvlxyXG4gKi9cclxuXHJcbiAvKipcclxuICogQ2FsbGJhY2tzINC00LvRjyB1cGxvYWRQaG90by5cclxuICpcclxuICogQGNhbGxiYWNrIGZpbGVSZWFkZXJDYWxsYmFja1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZSAtINC+0LHRitC10LrRgiBldmVudCDRgdC+0LHRi9GC0LjRjyBGaWxlUmVhZGVyLm9ubG9hZFxyXG4gKlxyXG4gKiBAY2FsbGJhY2sgbm90RmlsZVJlYWRlckNhbGxiYWNrXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBlIC0g0L7QsdGK0LXQutGCIGV2ZW50INGB0L7QsdGL0YLQuNGPIGlucHV0LmNoYW5nZVxyXG4gKi9cclxuXHJcbnZhciB1cGxvYWRQaG90byA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICh3aW5kb3cuRmlsZSAmJiB3aW5kb3cuRmlsZVJlYWRlciAmJiB3aW5kb3cuRmlsZUxpc3QgJiYgd2luZG93LkJsb2IpIHtcclxuXHJcbiAgICAgICAgdXBsb2FkUGhvdG8gPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5pbnB1dC5maWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKCBvcHRpb25zLmlucHV0LmZpbGVzW2ldICk7XHJcbiAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHsgLy8g0JrQsNC6INGC0L7Qu9GM0LrQviDQutCw0YDRgtC40L3QutCwINC30LDQs9GA0YPQt9C40YLRgdGPXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbGVSZWFkZXJFbmFibGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsZVJlYWRlckVuYWJsZWQoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgdXBsb2FkUGhvdG8gPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWxlUmVhZGVyRGlzYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsZVJlYWRlckRpc2FibGVkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG51cGxvYWRQaG90bygpO1xyXG5cclxudmFyIF9nZXRGaWxlTmFtZSA9IGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICB2YXIgdmFsID0gaW5wdXQudmFsdWU7XHJcblxyXG4gICAgaWYgKCF2YWwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB2YWwgPSB2YWwuc3BsaXQoJ1xcXFwnKTtcclxuXHJcbiAgICByZXR1cm4gdmFsW3ZhbC5sZW5ndGggLSAxXTtcclxufTtcclxuXHJcbnZhciBfYWRkTGlzdGVuRmlsZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKCcuanMtYXZhdGFyLXVwbG9hZCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICR3cmFwcGVyID0gJHRoaXMuY2xvc2VzdCgnLmFkZC1waG90bycpLFxyXG4gICAgICAgICAgICAkYXZhID0gJHdyYXBwZXIuZmluZCgnLmFkZC1waG90b19fYXZhdGFyJyk7XHJcblxyXG4gICAgICAgIHVwbG9hZFBob3RvKHtcclxuICAgICAgICAgICAgaW5wdXQ6IHRoaXMsXHJcblxyXG4gICAgICAgICAgICBmaWxlUmVhZGVyRW5hYmxlZDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgJGF2YS5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6IGUudGFyZ2V0LnJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICBzcmNzZXQ6IGUudGFyZ2V0LnJlc3VsdCArICcgMngnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdhZGQtcGhvdG9fdXBsb2FkZWQnKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGZpbGVSZWFkZXJEaXNhYmxlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBfZ2V0RmlsZU5hbWUoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZmlsZU5hbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkd3JhcHBlci5hZGRDbGFzcygnYWRkLXBob3RvX3VwbG9hZGVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJGF2YS5hdHRyKHtcclxuICAgICAgICAgICAgICAgICAgICBzcmM6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsdDogZmlsZU5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjaGFuZ2UnLCAnLmpzLXVwbG9hZC1waG90bycsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICRpbnB1dENsb25lID0gJHRoaXMuY2xvbmUoKSxcclxuICAgICAgICAgICAgJHRlbXBsYXRlID0gJChcclxuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJhZGQtcGhvdG9fX2l0ZW0td3JhcHBlclwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidXNlci1waG90byBhZGQtcGhvdG9fX2l0ZW1cIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ1c2VyLXBob3RvX19pbWctd3JhcHBlclwiPjxpbWcgc3JjPVwiXCIgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIGNsYXNzPVwidXNlci1waG90b19faW1nIGFkZC1waG90b19faW1nXCIgYWx0PVwiXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIHRpdGxlPVwi0KPQtNCw0LvQuNGC0Ywg0YTQvtGC0L7Qs9GA0LDRhNC40Y5cIiBjbGFzcz1cInVzZXItcGhvdG9fX3JlbW92ZVwiPtCj0LTQsNC70LjRgtGMINGE0L7RgtC+0LPRgNCw0YTQuNGOJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9saT4nKTtcclxuXHJcbiAgICAgICAgJHRoaXMuYWZ0ZXIoJGlucHV0Q2xvbmUpO1xyXG5cclxuICAgICAgICB1cGxvYWRQaG90byh7XHJcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLFxyXG5cclxuICAgICAgICAgICAgZmlsZVJlYWRlckVuYWJsZWQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICR0ZW1wbGF0ZS5maW5kKCcuYWRkLXBob3RvX19pbWcnKS5hdHRyKCdzcmMnLCBlLnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmFkZC1waG90b19fbGlzdCcpLnByZXBlbmQoJHRlbXBsYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfYWRkUmVtb3ZlRmlsZSgkdGVtcGxhdGUuZmluZCgnLnVzZXItcGhvdG9fX3JlbW92ZScpKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJHRlbXBsYXRlLmZpbmQoJy5hZGQtcGhvdG9fX2l0ZW0nKS5hcHBlbmQoJHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gJHRoaXMudmFsKCcnKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGZpbGVSZWFkZXJEaXNhYmxlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBfZ2V0RmlsZU5hbWUoZS50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZmlsZU5hbWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGVtcGxhdGUuZmluZCgnLnVzZXItcGhvdG9fX2ltZycpLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgICAgICdhbHQnOiBmaWxlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAnc3JjJzogJydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICR0aGlzLmNsb3Nlc3QoJy5hZGQtcGhvdG9fX2l0ZW0td3JhcHBlcicpLmJlZm9yZSgkdGVtcGxhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIF9hZGRSZW1vdmVGaWxlKCR0ZW1wbGF0ZS5maW5kKCAnLnVzZXItcGhvdG9fX3JlbW92ZScgKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRoaXMudmFsKCcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjaGFuZ2UnLCAnLmpzLXVwbG9hZC1waG90by1zaW1wbGUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICRpbnB1dENsb25lID0gJHRoaXMuY2xvbmUoKSxcclxuICAgICAgICAgICAgJHRlbXBsYXRlID0gJChcclxuICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJhZGQtcGhvdG9fX2l0ZW0td3JhcHBlciBhZGQtcGhvdG9fX2l0ZW0td3JhcHBlcl9jaGFuZ2VcIj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidXNlci1waG90byBhZGQtcGhvdG9fX2l0ZW1cIj4nICtcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidXNlci1waG90b19faW1nLXdyYXBwZXJcIj48aW1nIHNyYz1cIlwiICcgK1xyXG4gICAgICAgICAgICAgICAgJyBjbGFzcz1cInVzZXItcGhvdG9fX2ltZyBhZGQtcGhvdG9fX2ltZ1wiIGFsdD1cIlwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj4nICtcclxuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICc8YnV0dG9uIHRpdGxlPVwi0KPQtNCw0LvQuNGC0Ywg0YTQvtGC0L7Qs9GA0LDRhNC40Y5cIiBjbGFzcz1cInVzZXItcGhvdG9fX3JlbW92ZVwiPtCj0LTQsNC70LjRgtGMINGE0L7RgtC+0LPRgNCw0YTQuNGOJyArXHJcbiAgICAgICAgICAgICAgICAnPC9idXR0b24+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAnPC9saT4nKTtcclxuXHJcbiAgICAgICAgJHRoaXMuYWZ0ZXIoJGlucHV0Q2xvbmUpO1xyXG5cclxuICAgICAgICB1cGxvYWRQaG90byh7XHJcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLFxyXG5cclxuICAgICAgICAgICAgZmlsZVJlYWRlckVuYWJsZWQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICR0ZW1wbGF0ZS5maW5kKCcuYWRkLXBob3RvX19pbWcnKS5hdHRyKCdzcmMnLCBlLnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoJy5hZGQtcGhvdG9fX2l0ZW0td3JhcHBlcl9jaGFuZ2UnKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYWRkLXBob3RvX19saXN0JykuZmluZCgnLmFkZC1waG90b19faXRlbS13cmFwcGVyX2NoYW5nZScpLnJlcGxhY2VXaXRoKCR0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5hZGQtcGhvdG9fX2xpc3QnKS5wcmVwZW5kKCR0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX2FkZFJlbW92ZUZpbGUoJHRlbXBsYXRlLmZpbmQoJy51c2VyLXBob3RvX19yZW1vdmUnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRlbXBsYXRlLmZpbmQoJy5hZGQtcGhvdG9fX2l0ZW0nKS5hcHBlbmQoJHRoaXMpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZmlsZVJlYWRlckRpc2FibGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaWxlTmFtZSA9IF9nZXRGaWxlTmFtZShlLnRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFmaWxlTmFtZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICR0ZW1wbGF0ZS5maW5kKCcudXNlci1waG90b19faW1nJykuYXR0cih7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2FsdCc6IGZpbGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICdzcmMnOiAnJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHRoaXMuY2xvc2VzdCgnLmFkZC1waG90b19faXRlbS13cmFwcGVyJykuYmVmb3JlKCR0ZW1wbGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgX2FkZFJlbW92ZUZpbGUoJHRlbXBsYXRlLmZpbmQoICcudXNlci1waG90b19fcmVtb3ZlJyApKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkdGhpcy52YWwoJycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBfYWRkUmVtb3ZlRmlsZSA9IGZ1bmN0aW9uICggYnRuICkge1xyXG5cclxuICAgIHZhciByZW1vdmUgPSBmdW5jdGlvbiAoIGJ0biApIHtcclxuICAgICAgICBidG4uY2xvc2VzdCgnLmFkZC1waG90b19faXRlbS13cmFwcGVyJykucmVtb3ZlKCk7XHJcbiAgICAgICAgYnRuLmNsb3Nlc3QoJy5jYWJpbmV0X191c2VyLXBob3RvJykucmVtb3ZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICggYnRuICkge1xyXG4gICAgICAgIGJ0bi5vbiggJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJlbW92ZSgkKCB0aGlzICkpO1xyXG4gICAgICAgIH0gKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJsb2NrcyA9ICQoJy51c2VyLXBob3RvX19yZW1vdmUnKTtcclxuXHJcbiAgICBibG9ja3Mub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZW1vdmUoJCggdGhpcyApKTtcclxuICAgIH0gKTtcclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy52aWV3cG9ydFVuaXRzQnVnZ3lmaWxsLmluaXQoe1xyXG4gICAgICAgICAgICBoYWNrczogd2luZG93LnZpZXdwb3J0VW5pdHNCdWdneWZpbGxIYWNrc1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHN2ZzRldmVyeWJvZHkoKTtcclxuICAgIH1cclxufTtcclxuIiwidmFyIHRyaWdnZXJPblNjcm9sbCA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy90cmlnZ2VyLW9uLXNjcm9sbCcpLFxyXG4gICAgcGFnZU9wZW5UaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbmZ1bmN0aW9uIGluaXRCYXR0ZXJ5KCRiYXR0ZXJ5KSB7XHJcbiAgICB2YXIgJGJhdHRlcnkgPSAkYmF0dGVyeSB8fCAkKCcuYmF0dGVyeScpLFxyXG4gICAgICAgIHBlcmNlbnRfbnVtYmVyX3N0ZXAgPSAkLmFuaW1hdGVOdW1iZXIubnVtYmVyU3RlcEZhY3Rvcmllcy5hcHBlbmQoJyUnKTtcclxuXHJcbiAgICBpZiAoJGJhdHRlcnkubGVuZ3RoKSB7XHJcbiAgICAgICAgJGJhdHRlcnkuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICB2YWwgPSBwYXJzZUludCgkdGhpcy5kYXRhKCd2YWwnKSksXHJcbiAgICAgICAgICAgICAgICAkcHJvZ3Jlc3NCYXIgPSAkdGhpcy5maW5kKCcuYmF0dGVyeV9fcHJvZ3Jlc3MnKSxcclxuICAgICAgICAgICAgICAgICR2YWxCbG9jayA9ICR0aGlzLmZpbmQoJy5iYXR0ZXJ5X192YWwnKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF90cmlnZ2VyQmF0dGVyeSgpIHtcclxuICAgICAgICAgICAgICAgICRwcm9ncmVzc0Jhci5jc3MoJ3dpZHRoJywgdmFsICsgJyUnKTtcclxuICAgICAgICAgICAgICAgICR2YWxCbG9jay5hbmltYXRlTnVtYmVyKHtcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXI6IHZhbCxcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXJTdGVwOiBwZXJjZW50X251bWJlcl9zdGVwXHJcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJpZ2dlck9uU2Nyb2xsKCR0aGlzLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWN1bmRzU2luY2VQYWdlT3BlbiA9IChuZXcgRGF0ZSgpIC0gcGFnZU9wZW5UaW1lKSAvIDEwMDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlY3VuZHNTaW5jZVBhZ2VPcGVuID4gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uU2Nyb2xsKCR0aGlzLCBfdHJpZ2dlckJhdHRlcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuJChkb2N1bWVudCkub24oJ2JhdHRlcnktbG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgaW5pdEJhdHRlcnkoKTtcclxufSApO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0QmF0dGVyeVxyXG59O1xyXG4iLCIkYnVyZ2VyQnRuID0gJCgnLmJ1cmdlci1idG4nKTtcclxuXHJcbmZ1bmN0aW9uIF9jbGlja0V2ZW50KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdidXJnZXItYnRuX2FjdGl2ZScpO1xyXG59XHJcblxyXG4kYnVyZ2VyQnRuLm9uKCdjbGljaycsIF9jbGlja0V2ZW50KTtcclxuIiwiZnVuY3Rpb24gX3RpbGluZ0lucHV0Q2hhbmdlKGUpIHtcclxuXHJcbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICR0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuICAgICAgICAkaW5wdXRzID0gJHRoaXMuZmluZCgnLmN1c3RvbS1pbnB1dF9faGlkZGVuJyksXHJcbiAgICAgICAgJHVzZXJWYWwgPSAkdGhpcy5maW5kKCcuY3VzdG9tLWlucHV0X3VzZXItdmFsIC5jdXN0b20taW5wdXRfX2xhYmVsJyksXHJcbiAgICAgICAgJHVzZXJWYWxJbnB1dCA9ICR0YXJnZXQuY2xvc2VzdCgnLmN1c3RvbS1pbnB1dF91c2VyLXZhbCcpO1xyXG5cclxuICAgIGlmICgkdXNlclZhbElucHV0Lmxlbmd0aCkge1xyXG4gICAgICAgICRpbnB1dHMuZmlsdGVyKCc6Y2hlY2tlZCcpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcclxuICAgICAgICAkdXNlclZhbC5hZGRDbGFzcygnY3VzdG9tLWlucHV0X19sYWJlbF9oYXMtdmFsJyk7XHJcblxyXG4gICAgICAgIGlmICgkaW5wdXRzLmF0dHIoJ3JlcXVpcmVkJykpIHtcclxuICAgICAgICAgICAgJGlucHV0cy5yZW1vdmVBdHRyKCdyZXF1aXJlZCcpO1xyXG4gICAgICAgICAgICAkdXNlclZhbC5hdHRyKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgJHVzZXJWYWxcclxuICAgICAgICAgICAgLnZhbCgnJylcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjdXN0b20taW5wdXRfX2xhYmVsX2hhcy12YWwnKTtcclxuXHJcbiAgICAgICAgaWYgKCR1c2VyVmFsLmF0dHIoJ3JlcXVpcmVkJykpIHtcclxuICAgICAgICAgICAgJHVzZXJWYWwucmVtb3ZlQXR0cigncmVxdWlyZWQnKTtcclxuICAgICAgICAgICAgJGlucHV0cy5hdHRyKCdyZXF1aXJlZCcsICcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciAkdGlsaW5nSW5wdXRzQ29udGFpbmVyID0gJCgnLnRpbGluZy1pbnB1dHMnKTtcclxuXHJcbiAgICAgICAgaWYgKCR0aWxpbmdJbnB1dHNDb250YWluZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICR0aWxpbmdJbnB1dHNDb250YWluZXIub24oJ2NoYW5nZScsIF90aWxpbmdJbnB1dENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4iLCJqUXVlcnkuZXh0ZW5kKGpRdWVyeS5mbi5waWNrYWRhdGUuZGVmYXVsdHMsIHtcclxuICAgIG1vbnRoc0Z1bGw6IFsgJ9GP0L3QstCw0YDRjycsICfRhNC10LLRgNCw0LvRjycsICfQvNCw0YDRgtCwJywgJ9Cw0L/RgNC10LvRjycsICfQvNCw0Y8nLCAn0LjRjtC90Y8nLCAn0LjRjtC70Y8nLCAn0LDQstCz0YPRgdGC0LAnLCAn0YHQtdC90YLRj9Cx0YDRjycsICfQvtC60YLRj9Cx0YDRjycsICfQvdC+0Y/QsdGA0Y8nLCAn0LTQtdC60LDQsdGA0Y8nIF0sXHJcbiAgICBtb250aHNTaG9ydDogWyAn0Y/QvdCyJywgJ9GE0LXQsicsICfQvNCw0YAnLCAn0LDQv9GAJywgJ9C80LDQuScsICfQuNGO0L0nLCAn0LjRjtC7JywgJ9Cw0LLQsycsICfRgdC10L0nLCAn0L7QutGCJywgJ9C90L7RjycsICfQtNC10LonIF0sXHJcbiAgICB3ZWVrZGF5c0Z1bGw6IFsgJ9Cy0L7RgdC60YDQtdGB0LXQvdGM0LUnLCAn0L/QvtC90LXQtNC10LvRjNC90LjQuicsICfQstGC0L7RgNC90LjQuicsICfRgdGA0LXQtNCwJywgJ9GH0LXRgtCy0LXRgNCzJywgJ9C/0Y/RgtC90LjRhtCwJywgJ9GB0YPQsdCx0L7RgtCwJyBdLFxyXG4gICAgd2Vla2RheXNTaG9ydDogWyAn0LLRgScsICfQv9C9JywgJ9Cy0YInLCAn0YHRgCcsICfRh9GCJywgJ9C/0YInLCAn0YHQsScgXSxcclxuICAgIHRvZGF5OiAn0YHQtdCz0L7QtNC90Y8nLFxyXG4gICAgY2xlYXI6ICfRg9C00LDQu9C40YLRjCcsXHJcbiAgICBjbG9zZTogJ9C30LDQutGA0YvRgtGMJyxcclxuICAgIGZpcnN0RGF5OiAxLFxyXG4gICAgZm9ybWF0OiAnZGQubW0ueXl5eScsXHJcbiAgICBmb3JtYXRTdWJtaXQ6ICd5eXl5L21tL2RkJ1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGluaXQoJGRhdGVwaWNrZXIpIHtcclxuICAgICRkYXRlcGlja2VyID0gJGRhdGVwaWNrZXIgfHwgJCgnLmRhdGVwaWNrZXInKTtcclxuXHJcbiAgICAkZGF0ZXBpY2tlci5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAkaW5wdXQgPSAkdGhpcy5maW5kKCcuZGF0ZXBpY2tlcl9faW5wdXQnKSxcclxuICAgICAgICAgICAgJHBpY2tlckNvbnRhaW5lciA9ICR0aGlzLmZpbmQoJy5waWNrZXInKTtcclxuXHJcbiAgICAgICAgJGlucHV0LnBpY2thZGF0ZSh7XHJcbiAgICAgICAgICAgIG9uT3BlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hpZGRlbi1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGlucHV0LmFkZENsYXNzKCdkYXRlcGlja2VyX19pbnB1dF9oaWRkZW4nKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25DbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbi1maXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgJGlucHV0LnJlbW92ZUNsYXNzKCdkYXRlcGlja2VyX19pbnB1dF9oaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRcclxufVxyXG4iLCJ2YXIgJGRvbmF0aW9uID0gJCgnLmRvbmF0aW9uJyksXG4gICAgJGRvbmF0aW9uRm9ybSA9ICRkb25hdGlvbi5maW5kKCcuZG9uYXRpb25fX2Zvcm0nKSxcbiAgICAkc2NyZWVucyA9ICRkb25hdGlvbi5maW5kKCcuZG9uYXRpb25fX3NjcmVlbicpLFxuICAgICRzdGVwcyA9ICRkb25hdGlvbi5maW5kKCcuZG9uYXRpb25fX3N0ZXAnKSxcbiAgICAkbmV4dEJ0biA9ICRkb25hdGlvbi5maW5kKCcuZG9uYXRpb25fX2J0bi1uZXh0JyksXG4gICAgJG1ldGhvZFJhZGlvID0gJCgnLmRvbmF0aW9uX19wYXltZW50X21ldGhvZCA6cmFkaW8nKSxcbiAgICAkZG9uYXRpb25MYWJlbCA9ICQoJy5kb25hdGlvbl9fbGFiZWxfcGF5bWVudCcpLFxuICAgICR0eXBlUmFkaW8gPSAkKCcuZG9uYXRpb25fX3BheW1lbnRfdHlwZSA6cmFkaW8nKSxcbiAgICAkaXNBZ3JlZSA9ICQoJyNkb25hdGlvbi1pc19hZ3JlZScpLFxuICAgIC8vJHN1Ym1pdEJ0biA9ICRkb25hdGlvbi5maW5kKCcuYnRuW3R5cGU9XCJzdWJtaXRcIl0nKSxcbiAgICAkc3VibWl0QnRuID0gJGRvbmF0aW9uLmZpbmQoJy5idG5fX2RvbmF0aW9uLS1maW5pc2gnKTtcbiAgICAkbG9naW5CdG4gPSAkKCcuZm9ybV9fcm93X3NvY2lhbHMgLmF1dGgtc29jX19zb2NpYWxzIC5zb2NpYWxzX19saW5rJyk7XG4gICAgY3VycmVudFN0ZXAgPSAwLFxuICAgIGN1c3RvbUlucHV0TW9kdWxlID0gcmVxdWlyZSgnLi9jdXN0b20taW5wdXQnKSxcbiAgICBzZWxlY3RNb2R1bGUgPSByZXF1aXJlKCcuL3NlbGVjdCcpO1xuXG52YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIF9zZXR1cExpc3RlbmVycygpO1xuXG4gICAgX3R5cGVDaGFuZ2VMaXN0ZW5lcigpO1xufTtcbiBcbnZhciBfc2F2ZUZvcm0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZm9ybSA9IEpTT04uc3RyaW5naWZ5KCQoJy5kb25hdGlvbicpLmZpbmQoJ2Zvcm0nKS5zZXJpYWxpemVBcnJheSgpKTtcbiAgICAkLmNvb2tpZSgnZG9uYXRpb24tZm9ybScsIGZvcm0sIHtleHBpcmVzOiAxLCBwYXRoOiAnLyd9KTtcbiAgICBcbn0gXG5cbnZhciBfc2V0dXBMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcblxuICAgIGlmICgkZG9uYXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICRkb25hdGlvbi5vbignY2xpY2snLCBfY2xpY2tMaXN0ZW5lcik7XG4gICAgfVxuICAgIFxuICAgIGlmICgkbG9naW5CdG4ubGVuZ3RoKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuZm9ybV9fcm93X3NvY2lhbHMgLmF1dGgtc29jX19zb2NpYWxzIC5zb2NpYWxzX19saW5rJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgX3NhdmVGb3JtKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAkKGRvY3VtZW50KS5vbignc2V0X3N0ZXAnLCAnLmRvbmF0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJ2FbaHJlZj1cIiNuZXh0XCJdJykuY2xpY2soKTtcbiAgICAgICAgJCgnYVtocmVmPVwiI25leHRcIl0nKS5jbGljaygpO1xuICAgIH0pO1xufTtcblxudmFyIF90eXBlQ2hhbmdlTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoJG1ldGhvZFJhZGlvLmxlbmd0aCkge1xuXG4gICAgICAgIHZhciBjdXJUeXBlID0gJHR5cGVSYWRpby5maWx0ZXIoJy5jdXN0b20taW5wdXRfX2hpZGRlbjpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgJG1ldGhvZFJhZGlvLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgJGRvbmF0aW9uTGFiZWwuaGlkZSgpO1xuXG4gICAgICAgICRkb25hdGlvbkxhYmVsLmZpbHRlcignLnR5cGUtJyArIGN1clR5cGUpLnNob3coKTtcblxuICAgICAgICAkKCcuZm9ybV9fcm93LnR5cGUnKS5oaWRlKCk7XG4gICAgICAgICQoJy5mb3JtX19yb3cudHlwZScpLmZpbmQoJ2lucHV0JykucmVtb3ZlQXR0cigncmVxdWlyZWQnKTtcbiAgICAgICAgXG4gICAgICAgICRkb25hdGlvbkxhYmVsLmZpbHRlcignLnR5cGUtJyArIGN1clR5cGUpLnNob3coKTtcbiAgICAgICAgJCgnLmZvcm1fX3Jvdy50eXBlLScgKyBjdXJUeXBlKS5zaG93KCk7XG4gICAgICAgICQoJy5mb3JtX19yb3cudHlwZS0nICsgY3VyVHlwZSkuZmluZCgnaW5wdXQnKS5hdHRyKCdyZXF1aXJlZCcsICdyZXF1aXJlZCcpO1xuXG4gICAgICAgICRtZXRob2RSYWRpby5wYXJlbnQoKS5maWx0ZXIoJy50eXBlLScgKyBjdXJUeXBlKS5zaG93KClcbiAgICAgICAgICAgIC5maW5kKCc6cmFkaW8nKS5lcSgwKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgfVxufTtcblxudmFyIHNldFN0ZXAgPSBmdW5jdGlvbihudW0pIHtcbiAgICB2YXIgJHNjcmVlbkFjdGl2ZSA9ICRzY3JlZW5zLmZpbHRlcignLmRvbmF0aW9uX19zY3JlZW5fYWN0aXZlJyksXG4gICAgICAgICRuZXdTY3JlZW4gPSAkc2NyZWVucy5lcShudW0pO1xuXG4gICAgaWYgKCRuZXdTY3JlZW4uaXMoJHNjcmVlbkFjdGl2ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgICRzY3JlZW5BY3RpdmUucmVtb3ZlQ2xhc3MoJ2RvbmF0aW9uX19zY3JlZW5fYWN0aXZlJyk7XG4gICAgJG5ld1NjcmVlblxuICAgICAgICAuZmFkZUluKDQwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkbmV3U2NyZWVuXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdkb25hdGlvbl9fc2NyZWVuX2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICdvcGFjaXR5JzogJycsXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAkc3RlcHNcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdkb25hdGlvbl9fc3RlcF9hY3RpdmUnKVxuICAgICAgICAuZXEobnVtKVxuICAgICAgICAuYWRkQ2xhc3MoJ2RvbmF0aW9uX19zdGVwX2FjdGl2ZScpO1xuXG4gICAgZm5Nb2R1bGUuYW5pbWF0ZVNjcm9sbCgkKCcubWFpbicpKTtcbn1cblxudmFyIF9jbGlja0xpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xuXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgJHRhcmdldCA9ICQoZS50YXJnZXQpLFxuICAgICAgICAkcHJldkJ0bkNsaWNrZWQgPSAkdGFyZ2V0LmNsb3Nlc3QoJy5kb25hdGlvbl9fYnRuLXByZXYnKSxcbiAgICAgICAgJG5leHRCdG5DbGlja2VkID0gJHRhcmdldC5jbG9zZXN0KCcuZG9uYXRpb25fX2J0bi1uZXh0Jyk7XG5cbiAgICBpZiAoJG5leHRCdG5DbGlja2VkLmxlbmd0aCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNldFN0ZXAoKytjdXJyZW50U3RlcCk7XG4gICAgfVxuXG4gICAgaWYgKCRwcmV2QnRuQ2xpY2tlZC5sZW5ndGgpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBzZXRTdGVwKC0tY3VycmVudFN0ZXApO1xuICAgIH1cblxufTtcbmZ1bmN0aW9uIF9zZXR1cFN0ZXBzKCkge1xuXG4gICAgdmFyICRtYWluID0gJGRvbmF0aW9uLmZpbmQoJy5kb25hdGlvbl9fbWFpbicpO1xuXG4gICAgJG1haW4uc3RlcHMoe1xuICAgICAgICBoZWFkZXJUYWc6ICcuZG9uYXRpb25fX3N0ZXAtbmFtZScsXG4gICAgICAgIGJvZHlUYWc6ICcuZG9uYXRpb25fX3N0ZXAtYm9keScsXG4gICAgICAgIGZvcmNlTW92ZUZvcndhcmQ6IHRydWUsXG4gICAgICAgIHRyYW5zaXRpb25FZmZlY3Q6ICdmYWRlJyxcbiAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICBuZXh0OiAn0J/QtdGA0LXQudGC0Lgg0Log0LLRi9Cx0L7RgNGDINGB0L/QvtGB0L7QsdCwINC+0L/Qu9Cw0YLRiycsXG4gICAgICAgICAgICBmaW5pc2g6ICfQntC/0LvQsNGC0LjRgtGMJ1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uSW5pdDogZnVuY3Rpb24oZSwgY3VycmVudCkge1xuXG4gICAgICAgICAgICB2YXIgJGJ1dHRvbnMgPSAkbWFpbi5maW5kKCcuYWN0aW9ucyBhJyk7XG5cbiAgICAgICAgICAgICRzdWJtaXRCdG4gPSAkZG9uYXRpb24uZmluZCgnLmJ0bl9fZG9uYXRpb24tLWZpbmlzaCcpO1xuICAgICAgICAgICAgJHN1Ym1pdEJ0bi5oaWRlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRidXR0b25zLmFkZENsYXNzKCdidG4gYnRuX3NpemVfd2lkZSBidG5fbGlnaHQnKTtcbiAgICAgICAgICAgIGN1c3RvbUlucHV0TW9kdWxlLmluaXQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvblN0ZXBDaGFuZ2VkOiBmdW5jdGlvbihlLCBjdXJJbmQpIHtcbiAgICAgICAgICAgIHZhciAkaXNBZ3JlZSA9ICRkb25hdGlvbi5maW5kKCdpbnB1dFtuYW1lPVwiaXNfYWdyZWVcIl0nKSxcbiAgICAgICAgICAgICAgICAkc3VibWl0QnRuID0gJGRvbmF0aW9uLmZpbmQoJy5idG5fX2RvbmF0aW9uLS1maW5pc2gnKTtcblxuICAgICAgICAgICAgaWYgKCRpc0FncmVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRpc0FncmVlLm9uKCdpbnB1dCBjaGFuZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkaXNBZ3JlZS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdWJtaXRCdG4ucmVtb3ZlQ2xhc3MoJ2J0bl9kaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdEJ0bi5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdEJ0bi5hZGRDbGFzcygnYnRuX2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3VibWl0QnRuLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyICRuZXh0QnRuID0gJG1haW4uZmluZCgnLmFjdGlvbnMgYVtocmVmPVwiI25leHRcIl0nKTtcbiAgICAgICAgICAgIHZhciAkZmluaXNoQnRuID0gJG1haW4uZmluZCgnLmFjdGlvbnMgYVtocmVmPVwiI2ZpbmlzaFwiXScpO1xuICAgICAgICAgICAgJGZpbmlzaEJ0bi5oaWRlKCk7XG4gICAgICAgICAgICAkc3VibWl0QnRuLmhpZGUoKTtcbiAgICAgICAgICAgIGlmIChjdXJJbmQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAkbmV4dEJ0bi50ZXh0KCfQn9C10YDQtdC50YLQuCDQuiDQvtC/0LvQsNGC0LUnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihjdXJJbmQgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAkbmV4dEJ0bi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJHN1Ym1pdEJ0bi5zaG93KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1c3RvbUlucHV0TW9kdWxlLmluaXQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkZpbmlzaGVkOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIHZhciAkZmluaXNoID0gJGRvbmF0aW9uLmZpbmQoJy5kb25hdGlvbl9fZmluaXNoJyksXG4gICAgICAgICAgICAgICAgJHRpdGxlID0gJGRvbmF0aW9uLmZpbmQoJy5kb25hdGlvbl9fdGl0bGUnKSxcbiAgICAgICAgICAgICAgICAkc3VibWl0QnRuID0gJGRvbmF0aW9uLmZpbmQoJy5idG5fX2RvbmF0aW9uLS1maW5pc2gnKTtcblxuICAgICAgICAgICAgJHN1Ym1pdEJ0bi5oaWRlKCk7XG4gICAgICAgICAgICAvLyRmaW5pc2guYWRkQ2xhc3MoJ2RvbmF0aW9uX19maW5pc2hfdmlzaWJsZScpO1xuICAgICAgICAgICAgJChkb2N1bWVudCkuc2Nyb2xsVG9wKDApO1xuICAgICAgICAgICAgJHRpdGxlLmhpZGUoKTtcbiAgICAgICAgICAgICRtYWluLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn1cblxudmFyIF9zZXR1cElucHV0UGhvbmVNYXNrID0gZnVuY3Rpb24oKSB7XG4gICAgJCgnLmpzLWlucHV0LXBob25lLW1hc2snKS5tYXNrKCcrNyg5OTkpIDk5OS05OS05OScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkZG9uYXRpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBfc2V0dXBMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIF90eXBlQ2hhbmdlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIF9zZXR1cFN0ZXBzKCk7XG4gICAgICAgICAgICBfc2V0dXBJbnB1dFBob25lTWFzaygpO1xuXG4gICAgICAgICAgICAkKCcuZG9uYXRpb25fX3BheW1lbnRfdHlwZScpLmZpbmQoJzpyYWRpbycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfdHlwZUNoYW5nZUxpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgICAgICAkKCcuZG9uYXRpb25fX3BheW1lbnRfbWV0aG9kJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICQoJy50eXBlLScgKyAkKHRoaXMpLnZhbCgpKS5zaG93KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0U3RlcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFN0ZXAoKTtcbiAgICB9XG59OyIsInZhciAkaGVhZGVyID0gJCgnLmhlYWRlcicpLFxuICAgICRidXJnZXJCdG4gPSAkKCcuaGVhZGVyX19idXJnZXInKSxcbiAgICAkc2VhcmNoQnRuID0gJCgnLnNlYXJjaF9faWNvbi13cmFwcGVyJyksXG4gICAgJHNlYXJjaEZvcm1IZWFkZXIgPSAkKCcubWVudV9fc2VhcmNoJyksXG4gICAgJGxvZ29IZWFkZXIgPSAkKCcuaGVhZGVyX19sb2dvJyk7XG5cbmZ1bmN0aW9uIG9wZW5NZW51KCkge1xuICAgICRoZWFkZXIudG9nZ2xlQ2xhc3MoJ2hlYWRlcl9tZW51LW9wZW5lZCcpO1xuICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnaGlkZGVuLWZpeGVkJyk7XG59XG5cbmZ1bmN0aW9uIF9zZXR1cExpc3RlbmVycygpIHtcbiAgICAkYnVyZ2VyQnRuLm9uKCdjbGljaycsIG9wZW5NZW51KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIF9zZXR1cExpc3RlbmVycygpO1xuICAgIH0sXG5cbiAgICBvcGVuTWVudTogb3Blbk1lbnVcbn07XG5cbiRzZWFyY2hGb3JtSGVhZGVyLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkc2VhcmNoRm9ybUhlYWRlci5hZGRDbGFzcygnbWVudV9fc2VhcmNoX2FjdGl2ZScpO1xuICAgICRsb2dvSGVhZGVyLmFkZENsYXNzKCdoaWRkZW4tdGV4dCcpO1xuXG4gICAgJChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoISRzZWFyY2hGb3JtSGVhZGVyLmlzKGUudGFyZ2V0KSAmJiAkc2VhcmNoRm9ybUhlYWRlci5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJiAkbG9nb0hlYWRlci5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJiAhJGxvZ29IZWFkZXIuaXMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAkc2VhcmNoRm9ybUhlYWRlci5yZW1vdmVDbGFzcygnbWVudV9fc2VhcmNoX2FjdGl2ZScpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJGxvZ29IZWFkZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbi10ZXh0Jyk7XG4gICAgICAgICAgICB9LCAzNTApO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBfc2V0dXBMaWtlQnRuID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgaWYgKHVzZXJBdXRoKSB7XHJcbiAgICAgICAgJHRoaXMudG9nZ2xlQ2xhc3MoJ2xpa2VfYWN0aXZlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcubGlrZScsIF9zZXR1cExpa2VCdG4pO1xyXG4gICAgfVxyXG59IiwiZnVuY3Rpb24gaW5pdCgkaW5wdXQpIHtcclxuICAgICRpbnB1dCA9ICRpbnB1dCB8fCAkKCcuanMtbWFza2VkLWlucHV0Jyk7XHJcblxyXG4gICAgaWYgKCRpbnB1dC5sZW5ndGgpIHtcclxuICAgICAgICAkaW5wdXQuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBtYXNrID0gJHRoaXMuZGF0YSgnbWFzaycpICsgJycsXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9ICR0aGlzLmRhdGEoJ21hc2stcGxhY2Vob2xkZXInKSB8fCAnXyc7XHJcblxyXG4gICAgICAgICAgICAkdGhpcy5tYXNrKG1hc2ssIHsgcGxhY2Vob2xkZXI6IHBsYWNlaG9sZGVyIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0XHJcbn1cclxuIiwiZnVuY3Rpb24gaW5pdCgpIHtcclxuXHJcbiAgICB2YXIgJHBvcHVwcyA9ICQoJy5wb3B1cCcpO1xyXG5cclxuICAgIGlmICgkcG9wdXBzLmxlbmd0aCkge1xyXG4gICAgICAgICRwb3B1cHMucmVtb2RhbCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBpbml0XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gaW5pdCgkc2VsZWN0KSB7XHJcblxyXG4gICAgJHNlbGVjdCA9ICRzZWxlY3QgPyAkc2VsZWN0IDogJCgnLnNlbGVjdCcpO1xyXG5cclxuICAgIGlmICgkc2VsZWN0Lmxlbmd0aCkge1xyXG4gICAgICAgICRzZWxlY3Quc3R5bGVyKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGluaXRcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciAkc2xpZGVycyA9ICQoJy5zbGlkZXInKTtcblxuZnVuY3Rpb24gX3NldHVwU2xpZGVycygpIHtcbiAgICBpbml0U2xpZGVycygpO1xuXG4gICAgJHNsaWRlcnMub24oJ3NsaWRlcjppdGVtcy1hZGRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpbml0U2xpZGVycygkKHRoaXMpLCB0cnVlKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdFNsaWRlcnMoJHRhcmdldFNsaWRlcnMsIHJlaW5pdCkge1xuICAgICR0YXJnZXRTbGlkZXJzID0gJHRhcmdldFNsaWRlcnMgfHwgJHNsaWRlcnM7XG5cbiAgICAkdGFyZ2V0U2xpZGVycy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGRvdHMgPSAkdGhpcy5kYXRhKCdkb3RzJyksXG4gICAgICAgICAgICBhcnJvd3MgPSAkdGhpcy5kYXRhKCdhcnJvd3MnKSxcbiAgICAgICAgICAgIGNlbnRlck1vZGUgPSAkdGhpcy5kYXRhKCdjZW50ZXInKSxcbiAgICAgICAgICAgIHZhcmlhYmxlV2lkdGggPSAkdGhpcy5kYXRhKCdjc3Mtd2lkdGgnKTtcblxuICAgICAgICBpZiAocmVpbml0KSB7XG4gICAgICAgICAgICAkdGhpcy5zbGljaygndW5zbGljaycpO1xuICAgICAgICAgICAgJHRoaXMuZmluZCgnW2FyaWEtZGVzY3JpYmVkYnlePVwic2xpY2stc2xpZGVcIl0nKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICR0aGlzLnNsaWNrKHtcbiAgICAgICAgICAgIGFycm93czogYXJyb3dzLFxuICAgICAgICAgICAgZG90czogZG90cyxcbiAgICAgICAgICAgIG1vYmlsZUZpcnN0OiB0cnVlLFxuICAgICAgICAgICAgY2VudGVyTW9kZTogY2VudGVyTW9kZSxcbiAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IHZhcmlhYmxlV2lkdGhcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJHNsaWRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBfc2V0dXBTbGlkZXJzKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW5pdFNsaWRlcnM6IGluaXRTbGlkZXJzXG59XG4iLCJ2YXIgX3JvbGxPdXRTdXBwb3J0ZXJEZXNjID0gZnVuY3Rpb24oZSkge1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAkYmxvY2sgPSAkdGhpcy5jbG9zZXN0KCcuc3VwcG9ydGVyJyk7XHJcblxyXG4gICAgJGJsb2NrLnRvZ2dsZUNsYXNzKCdzdXBwb3J0ZXJfb3BlbicpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnN1cHBvcnRlcl9fc3dpdGNoJywgX3JvbGxPdXRTdXBwb3J0ZXJEZXNjKTtcclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdGFicyA9ICQoJy50YWJzJyk7XHJcblxyXG52YXIgX2luaXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciAkdGFyZ2V0ID0gJHRhYnMuZmluZCgnW2RhdGEtaHJlZj0nICsgd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoJyMnKVsxXSArICddJyk7XHJcblxyXG4gICAgJHRhcmdldC5jbGljaygpO1xyXG59XHJcblxyXG52YXIgX3NldHVwTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIF9jbGlja0V2ZW50ID0gZnVuY3Rpb24oZSkge1xyXG5cclxuICAgICAgICB2YXIgJHRhYnMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAkdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcbiAgICAgICAgICAgICRuYXZJdGVtID0gJHRhcmdldC5jbG9zZXN0KCcudGFic19fbmF2LWl0ZW0nKTtcclxuXHJcbiAgICAgICAgaWYgKCRuYXZJdGVtLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRuYXZJdGVtLmhhc0NsYXNzKCd0YWJzX19uYXYtaXRlbV9hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgJGZpcnN0UGFuZWwgPSAkdGFicy5maW5kKCcudGFic19fcGFuZWwnKS5maXJzdCgpLFxyXG4gICAgICAgICAgICAkcGFuZWxzID0gJGZpcnN0UGFuZWwuYWRkKCRmaXJzdFBhbmVsLnNpYmxpbmdzKCcudGFic19fcGFuZWwnKSksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQYW5lbCA9ICRuYXZJdGVtLmRhdGEoJ3RhYicpO1xyXG5cclxuICAgICAgICAgICAgJG5hdkl0ZW1cclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygndGFic19fbmF2LWl0ZW1fYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYnNfX25hdi1pdGVtX2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgJHBhbmVsc1xyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWJzX19wYW5lbF9hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcignW2RhdGEtdGFiPScgKyB0YXJnZXRQYW5lbCArICddJylcclxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygndGFic19fcGFuZWxfYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfY2xpY2tMaW5rRXZlbnQgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyICR0YXJnZXQgPSAkdGFicy5maW5kKCdbZGF0YS1ocmVmPScgKyAkKHRoaXMpLmF0dHIoJ2hyZWYnKS5zcGxpdCgnIycpWzFdICsgJ10nKTtcclxuXHJcbiAgICAgICAgJHRhcmdldC5jbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgICR0YWJzLm9uKCdjbGljaycsIF9jbGlja0V2ZW50KTtcclxuICAgICR0YWJzLm9uKCdjbGljaycsICcuanMtb3Blbi10YWInLCBfY2xpY2tMaW5rRXZlbnQpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJHRhYnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIF9zZXR1cExpc3RlbmVycygpO1xyXG4gICAgICAgICAgICBfaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ2YXIgJHRvZ2dsZVdyYXBwZXIgPSAkKCcuanMtdG9nZ2xlLXdyYXBwZXInKTtcclxuXHJcbnZhciBfc2V0dXBMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgX2NsaWNrRXZlbnQgPSBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgICAgIHZhciAkd3JhcCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuICAgICAgICAgICAgJGJ0biA9ICR0YXJnZXQuY2xvc2VzdCgnLmpzLXRvZ2dsZS1idG4nKTtcclxuXHJcbiAgICAgICAgaWYgKCRidG4ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHdyYXAuaGFzQ2xhc3MoXCJqcy10b2dnbGUtd3JhcHBlcl9vcGVuXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSgnJywgZG9jdW1lbnQudGl0bGUsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAkd3JhcC5yZW1vdmVDbGFzcyhcImpzLXRvZ2dsZS13cmFwcGVyX29wZW5cIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAkd3JhcC5hdHRyKCdpZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICR3cmFwLnJlbW92ZUF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gaWQ7XHJcbiAgICAgICAgICAgICAgICAkd3JhcC5hdHRyKCdpZCcsIGlkKTtcclxuICAgICAgICAgICAgICAgICR3cmFwLmFkZENsYXNzKFwianMtdG9nZ2xlLXdyYXBwZXJfb3BlblwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgICR0b2dnbGVXcmFwcGVyLm9uKCdjbGljaycsIF9jbGlja0V2ZW50KTtcclxufTtcclxuXHJcbnZhciBfdG9nZ2xlT25QYWdlT3BlbiA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGlmICgkdG9nZ2xlV3JhcHBlci5sZW5ndGgpIHtcclxuICAgICAgICB2YXIgaGFzaCA9IGxvY2F0aW9uLmhhc2gsXHJcbiAgICAgICAgICAgICR0YXJnZXRUb2dnbGUgPSAkdG9nZ2xlV3JhcHBlci5maWx0ZXIoaGFzaCk7XHJcblxyXG4gICAgICAgIGlmICgkdGFyZ2V0VG9nZ2xlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAkdGFyZ2V0VG9nZ2xlLnRvZ2dsZUNsYXNzKCdqcy10b2dnbGUtd3JhcHBlcl9vcGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbnZhciBfdG9nZ2xlT25BY3RPcGVuID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGJ0bkFjdE9wZW4gPSAkKCcuanMtZnVuZC1hY3RzJyk7XHJcblxyXG4gICAgaWYgKGJ0bkFjdE9wZW4ubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgIGJ0bkFjdE9wZW4uY2xpY2soZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICRwYXJlbiA9ICR0aGlzLmNsb3Nlc3QoJy5mdW5kJyk7XHJcblxyXG4gICAgICAgICAgICAkcGFyZW4udG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgX3NldHVwTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgX3RvZ2dsZU9uUGFnZU9wZW4oKTtcclxuICAgICAgICBfdG9nZ2xlT25BY3RPcGVuKCk7XHJcbiAgICB9XHJcbn1cclxuIl19
