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
