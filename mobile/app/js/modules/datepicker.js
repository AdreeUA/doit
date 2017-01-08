jQuery.extend(jQuery.fn.pickadate.defaults, {
    monthsFull: [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
    monthsShort: [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек' ],
    weekdaysFull: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
    weekdaysShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ],
    today: 'сегодня',
    clear: 'удалить',
    close: 'закрыть',
    firstDay: 1,
    format: 'dd.mm.yyyy',
    formatSubmit: 'yyyy/mm/dd'
});

function init($datepicker) {
    $datepicker = $datepicker || $('.datepicker');

    $datepicker.each(function() {

        var $this = $(this),
            $input = $this.find('.datepicker__input'),
            $pickerContainer = $this.find('.picker');

        $input.pickadate({
            onOpen: function() {
                $('body').addClass('hidden-fixed');
                $input.addClass('datepicker__input_hidden');
            },
            onClose: function() {
                $('body').removeClass('hidden-fixed');
                $input.removeClass('datepicker__input_hidden');
            }
        });

    });
}

module.exports = {
    init: init
}
