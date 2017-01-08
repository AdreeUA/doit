var isVisible = require('./is-visible');

// Когда элемент (первый аргумент) в пределах видимости, запускается функция, переданная вторым аргументом
module.exports = function($elem, func) {

    var _runTrigger = function(e) {

        if (isVisible($elem)) {
            func();
            $(document).off('scroll', _runTrigger);
        }

    }

    $(document).on('scroll', _runTrigger);
    _runTrigger();

}
