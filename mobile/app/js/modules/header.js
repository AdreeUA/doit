var $header = $('.header'),
    $burgerBtn = $('.header__burger'),
    $searchBtn = $('.search__icon-wrapper'),
    $searchFormHeader = $('.menu__search'),
    $logoHeader = $('.header__logo');

function openMenu() {
    $header.toggleClass('header_menu-opened');
    $('body').toggleClass('hidden-fixed');
}

function _setupListeners() {
    $burgerBtn.on('click', openMenu);
}

module.exports = {
    init: function() {
        _setupListeners();
    },

    openMenu: openMenu
};

$searchFormHeader.click(function () {
    $searchFormHeader.addClass('menu__search_active');
    $logoHeader.addClass('hidden-text');

    $(document).mouseup(function (e) {
        if (!$searchFormHeader.is(e.target) && $searchFormHeader.has(e.target).length === 0 && $logoHeader.has(e.target).length === 0 && !$logoHeader.is(e.target)) {
            $searchFormHeader.removeClass('menu__search_active');
            setTimeout(function () {
                $logoHeader.removeClass('hidden-text');
            }, 350);
        }
    });
});
