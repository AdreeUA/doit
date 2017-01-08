function init() {

    var $popups = $('.popup');

    if ($popups.length) {
        $popups.remodal();
    }

}

module.exports = {
    init: init
}
