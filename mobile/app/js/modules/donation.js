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