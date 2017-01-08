'use strict';

var _setupLikeBtn = function(e) {
    var $this = $(this);

    e.preventDefault();

    if (userAuth) {
        $this.toggleClass('like_active');
    }
};

module.exports = {
    init: function() {
        $(document).on('click', '.like', _setupLikeBtn);
    }
}