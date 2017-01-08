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
