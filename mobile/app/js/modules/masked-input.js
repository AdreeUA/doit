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
