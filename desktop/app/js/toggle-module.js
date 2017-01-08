var toggleModule = (function() {

    var exportObj = {};

    var _setupListeners = function() {
        
        var $toggleWrapper = $('.js-toggle-wrapper');

        var _clickEvent = function(e) {

            var $wrap = $(this),
                $target = $(e.target),
                $btn = $target.closest('.js-toggle-btn');

            if ($btn.length) {

                if ($wrap.hasClass("js-toggle-wrapper_open")) {
                    history.pushState('', document.title, window.location.pathname);
                    $wrap.removeClass("js-toggle-wrapper_open");
                } else {
                    var id = $wrap.attr('id');
                    
                    $wrap.removeAttr('id');
                    location.hash = id;
                    $wrap.attr('id', id);
                    $wrap.addClass("js-toggle-wrapper_open");
                }

                e.preventDefault();
            }

        };

        $toggleWrapper.on('click', _clickEvent);
    };
    
    var _toggleOnPageOpen = function() {
        
        var $toggleWrapper = $('.js-toggle-wrapper');
        
        if ($toggleWrapper.length) {
            var hash = location.hash,
                $targetToggle = $toggleWrapper.filter(hash); 
            
            if ($targetToggle.length) {
                $targetToggle.toggleClass('js-toggle-wrapper_open');
            }
        }
        
    };

    exportObj.init = function() {

        _setupListeners();
        _toggleOnPageOpen();

    };

    return exportObj;

})();
