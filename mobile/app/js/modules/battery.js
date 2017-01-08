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
