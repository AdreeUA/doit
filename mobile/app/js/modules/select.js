'use strict';

function init($select) {

    $select = $select ? $select : $('.select');

    if ($select.length) {
        $select.styler();
    }
};

module.exports = {
    init: init
}
