var addActModule = (function() {

    var exportObj = {};

    var ajaxSettings = {
        success: function() {
            console.log('success');
        },
        error: function() {
            console.log('error');
        }
    };

    var $addAct = $('.add-act'),
        $mainPart = $addAct.find('.add-act__main'),
        $screens = $addAct.find('.add-act__screen:not(.add-fond-popup)'),
        $steps = $addAct.find('.add-act__steps-item'),
        $navBtnPrev = $addAct.find('.add-act__nav-btn_prev'),
        $navBtnNext = $addAct.find('.add-act__nav-btn_next' ),
        $addPhoto = $addAct.find('.j-addphoto'),
        $addPhotoBefore = $('.j-add-act-before-photo'),
        $categoriesInput = $addAct.find('#input__category_id'),
        $occasionsInput = $addAct.find('#input__reason_id'),
        $dateInput = $addAct.find('#behavior-date'),
        $infoInputs = $addAct.find('.add-act__info [required]'),
        $fundInput = $addAct.find('#input__fund_id'),
        $form = $addAct.find('#fund-registration-form'),
        currentStep = 0,
        steps = [
            'enabled', // первый шаг - выбор категории
            'enabled', // второй шаг - выбор повода
            'enabled', // третий шаг - информация о поступке
            'enabled'  // четвертый шаг - выбор фонда
        ],
        firstStep = 0,
        lastStep = steps.length - 1,
        currentStepValid = false;

    // remove fund selection for projects behavior
    if ($("#input__project_id").val() != '') {
        lastStep--;
    }


    var init = function() {

        if ($addAct.length) {
            setStep(_getIndexAnchor());

            _validate();

            _setupListeners();
        }
        _setupImgPreview();
        
        createActsSlider();
        
        $(document).on('reinit-sliders', '#fund-registration-form .funds-list', function(e) {
            createActsSlider();
        });
    };

    function createActsSlider() {
        var $fundsSlider = $('.funds-slider');

        var $acts = $('.funds-list__acts');
        var $item = $('.funds-slider__item');

        $fundsSlider.hide();

        $acts.on('click', function() {
            $fundsSlider.hide();
            var next = $(this).closest('.funds-list__item').next();
            next.show();
            if(!next.hasClass('slick-slider')) {
                next.slick({
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 1
                });
            }
        });

        $item.on('click', function() {
            $item.removeClass('_active');
            $(this).addClass('_active');
            $('#input__project_id').val($(this).attr('data-id'));
        });
    } 
    
    var _setupImgPreview = function () {
        PreviewImages('<div class="ovh max-block centriner js-thumbnail">' +
            '<div class="centriner__item">' +
            '<img class="max-img" src="" alt=""/></div>' +
            '</div>', $addPhoto, 'replace-input');
        /*
         PreviewImages('<li class="add-photo__item-wrapper"> ' +
         '<div class="user-photo add-photo__item"> <div class="user-photo__img-wrapper">' +
         '<img src="http://loremflickr.com/150/150" srcset="http://loremflickr.com/300/300 2x"' +
         ' class="user-photo__img add-photo__img" alt="" role="presentation"> </div>' +
         ' <button title="Удалить фотографию" class="user-photo__remove j-PreviewImage-remove">' +
         'Удалить фотографию </button> </div> </li>', $addPhotoBefore, 'before, cached, remove');*/
    };

    var _setupListeners = function() {
        $addAct.on('click', _clickListener);

        $infoInputs.on('change', function(e) {
            _validate();
        });

        $addPhoto.on('change', function(e) {
            if (this.files && this.files[0]) {
                var maxFileSize = parseInt($addPhoto.data('max-size')),
                    $wrapper = $addPhoto.closest('.add-photo__item-wrapper'),
                    $errorMessage = $wrapper.find('.help-block'),
                    fileSize = this.files[0].size;

                if (fileSize > maxFileSize) {
                    $addPhoto.val('');
                    $errorMessage.show();
                    $wrapper.find('.add-photo__item').removeClass('PreviewImage-loaded');
                    $wrapper.find('.js-thumbnail').remove();

                } else {

                    $errorMessage.hide();
                }

                _validate();
            }
        });
    };

    var _validate = function() {
        var valid = false;

        switch (currentStep) {
            case 0:
                if ($categoriesInput.val()) {
                    valid = true;
                }
                break;

            case 1:
                if ($occasionsInput.val()) {
                    valid = true;
                }
                break;

            case 2:
                valid = true;

                $infoInputs.each(function() {
                    var $this = $(this),
                        val = $this.val();

                    if (!val.length) {
                        valid = false;
                        return;
                    }
                });

                break;

            case 3:
                if ($fundInput.val()) {
                    valid = true;
                }
                break;
        }

        if (valid === true) {
            $navBtnNext.removeClass('btn_disabled');
        } else {
            $navBtnNext.addClass('btn_disabled');
        }

        return currentStepValid = valid;
    };

    var disableStep = function(stepNum) {
        steps[stepNum] = 'disabled';
        $steps.eq(stepNum).hide();

        if (stepNum === lastStep) {
            while (stepNum >= 0) {
                lastStep--;
                if (steps[lastStep] === 'enabled') {
                    break;
                }
            }

        }

        if (stepNum === firstStep) {

            while (stepNum < steps.length) {
                firstStep++;
                if (steps[firstStep] === 'enabled') {
                    break;
                }
            }
        }
    }

    var enableStep = function(stepNum) {
        steps[stepNum] = 'enabled';
        $steps.eq(stepNum).show();

        if (stepNum > lastStep) {
            lastStep = stepNum;
        }

        if (stepNum < firstStep) {
            firstStep = stepNum;
        }
    }

    var setStep = function (newStep) {

        if (newStep == undefined || newStep < firstStep || newStep > lastStep) return;

        var $screenActive = $screens.filter('.add-act__screen_active'),
            $screenNext = $screenActive.next('.add-act__screen'),
            $screenPrev = $screenActive.prev('.add-act__screen' ),
            $item = $screens.eq(newStep);

        $screenActive.removeClass('add-act__screen_active');

        $item
            .fadeIn(400, function() {
                $item
                    .addClass('add-act__screen_active')
                    .css({
                        'opacity': '',
                        'display': ''
                    });
            });

        $steps
            .removeClass('add-act__steps-item_active')
            .eq(newStep)
            .addClass('add-act__steps-item_active');

        fnModule.animateScroll($('.main'));

        // Если это последний шаг, то меняем текст кнопки "Следующий шаг" на "Опубликовать"
        if (newStep === lastStep) {
            $navBtnNext.text('Опубликовать');
        } else {
            $navBtnNext.text('Следующий шаг');
        }

        // Если это первый шаг, то скрываем кнопку "Назад", если не первый, то показываем
        if (newStep === firstStep) {
            $navBtnPrev.addClass('add-act__nav-btn_hidden');
            $navBtnNext.addClass('add-act__nav-btn_hidden');
            
        } else {
            if ($navBtnNext.hasClass('add-act__nav-btn_hidden')) {
                $navBtnNext.removeClass('add-act__nav-btn_hidden');
            }

            if ($navBtnPrev.hasClass('add-act__nav-btn_hidden')) {
                $navBtnPrev.removeClass('add-act__nav-btn_hidden');
            }
        }

        _changeUrlStep(newStep);

        currentStep = newStep;

        _validate();
    };

    var _getIndexAnchor = function () {
        var isStep = window.location.hash.indexOf('#step_') >= 0 ? true : false,
            stepNum = parseInt(window.location.hash[6]);

        if (!isStep || !$.isNumeric(stepNum) || stepNum > steps.length - 1) return undefined;

        return stepNum;
    };

    var _changeUrlStep = function ( step ) {
        var queryStart = window.location.hash.indexOf('?'),
            queryString = queryStart >= 0 ? window.location.hash.slice(queryStart) : '';

        Events.trigger('AddActModule.change', 'step_' + step + queryString);
    };

    var _clickListener = function(e) {

        var $this = $(this),
            $target = $(e.target),
            $navBtn = $target.closest('.add-act__nav-btn'),
            $categoriesItem = $target.closest('.add-act__categories-item'),
            $occasion = $target.closest('.add-act__occasions-item'),
            $chooseStep = $target.closest('.j-set-step'),
            $fund = $target.closest('.add-act__funds-item');

        if ($chooseStep.length) {
            e.preventDefault();

            var targetStep = parseInt($chooseStep.data('step'));

            if (targetStep >= currentStep) return;

            setStep(targetStep);
        }

        if ($navBtn.length) {
            if ($navBtn.hasClass('default_behavior')) {
                return;
            }
            e.preventDefault();

            if ($navBtn.hasClass('btn_disabled')) {
                return;
            }

            var $activeScreen = $screens.filter('.add-act__screen_active'),
                newStep = currentStep;

            for (var i = 0; i <= 5; i++) {
                // Если нажата кнопка "вперед", добавляем 1 шаг, если назад, отнимаем
                newStep = $navBtn.is($navBtnNext) ? ++newStep : --newStep;

                // Если мы на последнем шаге и жмем на кнопку "Впёред", то отправляем данные через ajax
                if (newStep > lastStep) {
                    $target.closest('form').submit();
                    return;
                }

                // Проверяем новый шаг, если он не заблокирован, прерываем цикл
                if (steps[newStep] === 'enabled') {
                    break;
                }
            }

            setStep(newStep);
        }

        if ($categoriesItem.length) {
            e.preventDefault();

            // if ($categoriesItem.hasClass('add-act__categories-item_selected')) {
            //     return;
            // }

            var val = $categoriesItem.data('val'),
                nextStep = $categoriesItem.data('step');

            $categoriesItem
                .addClass('add-act__categories-item_selected')
                .siblings()
                .removeClass('add-act__categories-item_selected');

            if ($categoriesItem.hasClass('js-my-act')) {
                disableStep(1);
            } else {
                enableStep(1);
            }

            $categoriesInput.val(val);

            _validate();

            if ($target.hasClass('add-act__categories-btn')) {

                var $step = $('.add-act__categories-item_selected').find('.add-act__categories-btn').data('step');
                setStep($step);
            }

            setStep(nextStep);
        }

        if ($occasion.length) {
            e.preventDefault();

            if ($occasion.hasClass('add-act__occasions-item_selected')) {
                return;
            }

            var val = $occasion.data('val'),
                date = $occasion.find('time').attr('datetime');

            $occasion
                .addClass('add-act__occasions-item_selected')
                .siblings()
                .removeClass('add-act__occasions-item_selected');

            $occasionsInput.val(val);

            if (date) {
                $dateInput.pickadate('picker').set('select', date, { format: 'yyyy-mm-dd' });
            } else {
                $dateInput.pickadate('picker').clear();
            }

            _validate();
        }

        if ($fund.length) {
            e.preventDefault();

            if ($fund.hasClass('add-act__funds-item_selected')) {
                return;
            }

            var val = $fund.data('val');

            $fund
                .addClass('add-act__funds-item_selected')
                .siblings()
                .removeClass('add-act__funds-item_selected');

            $fundInput.val(val);

            _validate();
        }
    };

    exportObj.init = init;
    exportObj.setStep = setStep;
    exportObj.disableStep = disableStep;
    exportObj.enableStep = enableStep;

    return exportObj;

})();
