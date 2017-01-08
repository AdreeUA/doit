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
