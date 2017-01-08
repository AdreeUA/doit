var donationModule = (function() {
    
    var exportObj = {};
    
    var $donation = $('.donation'),
        $donationForm = $donation.find('.donation__form'),
        $screens = $donation.find('.donation__screen'),
        $steps = $donation.find('.donation__step'),
        $nextBtn = $donation.find('.donation__btn-next'),
        $methodRadio = $('.donation__payment_method :radio'),
        $donationLabel = $('.donation__label_payment'),
        $typeRadio = $('.donation__payment_type :radio'),
        $isAgree = $('#donation-is_agree'),
        $submitBtn = $donation.find('.btn[type="submit"]'),
        $loginBtn = $donation.find('.auth-soc__socials .socials__link'),
        currentStep = 0;

        
    var init = function() {
        _setupListeners();

        _typeChangeListener();
        
        $.removeCookie('donation-form');
        
    };

    var _saveForm = function() {
        var form = JSON.stringify($donation.find('form').serializeArray());
        $.cookie('donation-form', form, {expires: 1, path: '/'});
        
    }
    
    var _setupListeners = function() {
        
        if ($donation.length) {
            
            $donation.on('click', _clickListener);
            $donation.on('submit', _submitListener);
            
        }

        if ($typeRadio.length) {

            $typeRadio.change(function() {
                _typeChangeListener();
            });
            
        }
        
        if ($loginBtn.length) {
            $loginBtn.click(function(e) {
                _saveForm();
            });
        }
        
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
        
    };
    
    var _submitListener = function(e) {
        
        var $this = $(this),
            $target = $(e.target),
            $donationFormSubmited = $target.closest('.donation__form');
        
        if ($donationFormSubmited.length) {
            e.preventDefault();
        }
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
    
    exportObj.init = init;
    exportObj.setStep = setStep;
    
    return exportObj;
    
})();
