var formModule = (function() {

    var exportObj = {};

    var init = function() {
        _setupListeners();
        _setupSelect();
        _setupDatePicker();
        _setupDateRangePicker();
        _setupPlaceholders();
        _setupLimitedMessage();
        _setupСharacterLimited();
        _setupInputMask();
        _setupInputPhoneMask();
    };

    var _setupListeners = function() {
        
        var $tilingInputsContainer = $('.tiling-inputs');
        $tilingInputsContainer.on('change', _tilingInputChange);
        
        _morphingSearchOnFocus();
        
        $('.js-input-number').on('input', function(e) {
            var $this = $(this),
                max = parseInt($this.data('max')),
                val = $this.val().match(/\d+/);
                
            if (parseInt(val) > max) {
                val = max;
            }
                
            $this.val(val);
        });

        $(document).on('focus', '.custom-placeholder', function(e) {
            var $this = $(this),
                $input = $this.find('.custom-placeholder__input'),
                $placeholder = $this.find('.custom-placeholder__text');

            $placeholder.hide();

            $this.one('focusout', function() {
                var val = $input.val();

                if (val) {
                    $placeholder.hide();
                } else {
                    $placeholder.show();
                }
            });
        });
    };

    var _hideCustomPlaceholder = function (e) {
        var $customInput = $('.custom-placeholder__input'),
            $placeholder = $('.custom-placeholder__text');

        if ($customInput.val()) {
            $customInput.siblings($placeholder).hide();
        } else {
            $customInput.siblings($placeholder).hide();
        }
    };

    _hideCustomPlaceholder();
    
    var _tilingInputChange = function(e) {
        
        var $this = $(this),
            $target = $(e.target),
            $inputs = $this.find('.custom-input__hidden'),
            $userVal = $this.find('.custom-input_user-val .custom-input__label'),
            $userValInput = $target.closest('.custom-input_user-val');

        if (!$userVal.length) {
            $this.off('change', _tilingInputChange);
            return;
        }
        
        if ($userValInput.length) { 
            $inputs.filter(':checked').removeAttr('checked');
            $userVal.addClass('custom-input__label_has-val');
        } else {
            $userVal
                .val('')
                .removeClass('custom-input__label_has-val');
        }
        
    }

    var _setupInputMask = function() {
        $('.js-input-mask').inputmask();
    }

    var _setupInputPhoneMask = function() {
        $('.js-input-phone-mask').inputmask('+7(999) 999-99-99', {clearMaskOnLostFocus: false });
    }

    var _setupSelect = function() {

        var $select = $('.select'),
            $selectAutocomplete = $('.js-select-autocomplete');

        if ($select.length) {
            $select.styler();
        }
        
        if ($selectAutocomplete.length) {
            $selectAutocomplete.select2({
                theme: "default select-autocomplete",
                width: '100%',
                language: {
                    noResults: function(){
                        return "Ничего не найдено";
                    }
                }
            });
        }

    };

    var _setupDatePicker = function() {

        var $datepicker = $('.datepicker__input');

        if ($datepicker.length) {

            $datepicker.each(function() {

                var $this = $(this),
                    $container = $this.closest('.datepicker'),
                    $placeholder = $container.find('.datepicker__placeholder'),
                    placeholderText = $placeholder.text();
                
                $this.pickadate({
                    onOpen: function() {
                        fnModule.toggleScrollBar($('html'), 'hide');
                        fnModule.toggleScrollBar($('.header'), 'hide');
                    },

                    onClose: function() {
                        // чтобы датапикер не открывался после перехода с другой вкладки 
                        $(document.activeElement).blur();

                        setTimeout(function() {
                            fnModule.toggleScrollBar($('html'), 'show');
                            fnModule.toggleScrollBar($('.header'), 'show');
                        }, 300);
                    },

                    onSet: function(thingSet){

                        if($this.hasClass("datepicker__input_big-size")) {
                            if (thingSet.select != undefined) {
                                var setDate = this.get('select', 'dd.mm.yyyy');
                                $placeholder
                                    .addClass('datepicker__placeholder_active')
                                    .text(setDate);
                            } else {
                                $placeholder
                                    .removeClass('datepicker__placeholder_active')
                                    .text(placeholderText);
                            }
                        }
                    }
                });
                var date = $this.val();
                if (date) {
                    $this.pickadate('picker').set('select', date, {format: 'yyyy-mm-dd'});
                }
                
            });

        }

    };
    
    var _setupDateRangePicker = function () {
        var $rangepickerPlaceholder = $('.datepicker__placeholder');
        var $rangepicker = $('.rangepicker');
        var $rangepickerInput = $('.rangepicker__input');

        $.pickmeup.locale = {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
        };

        $rangepickerInput.on('click', function () {
            $rangepicker.pickmeup('show');
        });

        var dateFormat = 'd.m.Y    ';

        $rangepicker.pickmeup({
            flat: true,
            mode: 'range',
            calendars: 2,
            data: [
                new Date
            ],
            change: function(formated, dates){
                
                var value = $rangepicker.pickmeup('get_date', 'd.m.Y');
                
                $rangepickerPlaceholder.html(value[0] + ' - ' + value[1]);
                $rangepickerInput.val($rangepicker.pickmeup('get_date', 'Y-m-d H:m:s'));
            }
        });

    };

    var _setupPlaceholders = function() {

        var $inputs = $('input textarea');

        if ($inputs.length) {
            $inputs.placeholder();
        }

    };

    var _morphingSearchOnFocus = function() {

        var $search = $('.search');

        if ($search.length) {

            $search.each(function() {

                var $currentSearch = $(this);

                if ($currentSearch.data('morphing')) {

                    var $wrapper = $currentSearch.find('.search__inner'),
                        $wrapperTop = $wrapper.css('top'),
                        $wrapperLeft = $wrapper.css('left'),
                        $rootSection = $currentSearch.closest($currentSearch.data('morphing-root')),
                        $rootSectionZindex = $rootSection.css('z-index');

                    var _morphing = function(e) {

                        var $this = $(this),
                            scroll = $(window).scrollTop();

                        fnModule.toggleZoom(false);

                        setTimeout(function() {
                            fnModule.toggleZoom(true);
                        }, 1000);

                        var _removeMorphing = function(e) {

                            var $target = $(e.target);
                            
                            if (e.type === 'keyup') {
                                if (e.keyCode !== 27) {
                                    return;
                                }
                                
                                // это для того, чтобы убрать фокус с инпута
                                $(':focus').blur();
                            }

                            if (e.type === 'click') {
                                if ($target.closest($wrapper).length) {
                                    return;
                                }
                            }

                            $rootSection.css('z-index', $rootSectionZindex);

                            fnModule.toggleScrollBar('body');

                            $wrapper.css({
                                'top': $wrapperTop
                            });

                            $currentSearch
                                .removeClass('search_morphing')
                                .off('click keyup', _removeMorphing)
                                .on('focus', '.search__input', _morphing);

                        };

                        $rootSection.css('z-index', 9999);
                        fnModule.toggleScrollBar('body');
                        fnModule.positionTo($wrapper, 'top');
                        $(window).scrollTop(scroll); // возвращаем скролл на то место, где он был. Это костыль для мобильных браузеров

                        $currentSearch
                            .addClass('search_morphing')
                            .off('focus', '.search__input', _morphing)
                            .on('click keyup', _removeMorphing);

                    };

                    $currentSearch.on('focus', '.search__input', _morphing);
                    
                    $('.header__search').click(function() {
                        var scroll = $(window).scrollTop();
                        
                        $('#hidden-search').trigger('focus');
                        
                        $(window).scrollTop(scroll);
                    });
                    
                    $('.j-main-search').click(function() {
                        var scroll = $(window).scrollTop();
                        
                        $('#hidden-search').trigger('focus');
                        
                        $(window).scrollTop(scroll);
                    });

                }

            });

        }

    };

    var _setupLimitedMessage = function() {

        var $limitedMessage = $('.limited-message');

        if ($limitedMessage.length) {

            $limitedMessage.each(function() {

                var $this = $(this),
                    maxLength = $this.data('max'),
                    $textarea = $this.find('.limited-message__textarea'),
                    $curVal = $this.find('.limited-message__current-val'),
                    $maxVal = $this.find('.limited-message__max-val'),
                    $progress = $this.find('.limited-message__progress-val');

                $maxVal.text(maxLength);

                $textarea.on('keyup change', function(e) {

                    var val = $textarea.val();

                    if (val.length > maxLength) {

                        val = val.slice(0, maxLength);
                        $textarea.val(val);

                    }

                    $curVal.text(val.length);

                    $progress.width(parseInt(val.length) / parseInt(maxLength) * 100 + '%');

                });

            });

        }

    };
    
    
    function isNotMax(e) {
        
        e = e || window.event;
        var target = e.target || e.srcElement;
        var code = e.keyCode ? e.keyCode : (e.which ? e.which : e.charCode)

        switch (code) {
            case 13:
            case 8:
            case 9:
            case 46:
            case 37:
            case 38:
            case 39:
            case 40:
                return true;
        }
        
        
        return target.value.length <= parseInt("0"+ target.getAttribute('data-max-charact'));
    }
    
    
    var _setupСharacterLimited = function() {

        var $limitedInput = $('.js-limiter-characters');

        if ($limitedInput.length) {

            $limitedInput.each(function () {
                
                var $self = $(this);
                
                
                function upDataLimiter(){
                                        
                    var quantityRows =  $self.val().split(/\r|\r\n|\n/).length - 1;
                    var quantityCharacters = $self.val().length + quantityRows;
                    var maxСharact = parseInt("0" + $self.attr("maxlength"));
                    var statusLine = quantityCharacters / maxСharact * 100;
                    
                    $self.parent(".input-limiter-wrapper").find(".quantity-characters").text(quantityCharacters);
                    $self.parent(".input-limiter-wrapper").find(".max-quantity-characters").text(maxСharact);
                    $self.parent(".input-limiter-wrapper").find(".status-line__completed").css({width: statusLine + "%"});
                    

                }
                
                upDataLimiter();
                
                $self.on("keydown", function(e){
                    upDataLimiter(); 
                });
                
            });
   
        }

    };
    
    
    exportObj.init = init;

    return exportObj;

})();
