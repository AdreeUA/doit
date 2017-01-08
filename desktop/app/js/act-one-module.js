var actOneModule = (function () {

    var exportObj = {};

    var $tabs = $('.tabs_acts-one'),
        $hideTab = $('.tabs__nav-link[data-hide]'),
        $hideBlock = $('.' + $hideTab.attr('data-hide')),
        $hideCont = $hideTab.closest('.act-columns__content-left');

    function init() {
        _hideSupport(); 
    }

    var _hideSupport = function() {
        if ($tabs.length) {
            $tabs.on('easytabs:before tabs:init', function(e, $activeTab, $activePanel) {
                if ($activeTab.is($hideTab)) {
                    $hideBlock.hide();
                    $hideCont.addClass('act-columns__content-left_base');
                    
                } else {
                    
                    $hideBlock.show();
                    $hideCont.removeClass('act-columns__content-left_base');
                }
            });
        }
    };

    exportObj.init = init;
    return exportObj;

})();
