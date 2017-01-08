var _rollOutSupporterDesc = function(e) {
    var $this = $(this),
        $block = $this.closest('.supporter');

    $block.toggleClass('supporter_open');
};

module.exports = {
    init: function() {
        $(document).on('click', '.supporter__switch', _rollOutSupporterDesc);
    }
}
