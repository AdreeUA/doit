$burgerBtn = $('.burger-btn');

function _clickEvent(e) {
    e.preventDefault();

    $(this).toggleClass('burger-btn_active');
}

$burgerBtn.on('click', _clickEvent);
