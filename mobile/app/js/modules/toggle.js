var $toggleWrapper = $('.js-toggle-wrapper');

var _setupListeners = function() {

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

    if ($toggleWrapper.length) {
        var hash = location.hash,
            $targetToggle = $toggleWrapper.filter(hash);

        if ($targetToggle.length) {
            $targetToggle.toggleClass('js-toggle-wrapper_open');
        }
    }

};

var _toggleOnActOpen = function() {

    var btnActOpen = $('.js-fund-acts');

    if (btnActOpen.length) {

        btnActOpen.click(function (e) {
            e.preventDefault();

            var $this = $(this),
                $paren = $this.closest('.fund');

            $paren.toggleClass('active');

        })
    }

};

module.exports = {
    init: function() {
        _setupListeners();
        _toggleOnPageOpen();
        _toggleOnActOpen();
    }
}
