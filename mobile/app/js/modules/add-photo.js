'use strict';

var init = function () {
    _addListenFile();
    _addRemoveFile();
};

/**
 * При первом запуске проверяет, поддерживает ли браузер FileReader API и в зависимости от этого
 * переопределяет себя
 *
 * @param {Object} options Объект с настройками
 * @param {HTMLElement} options.input input из которого берется загружаемый файл
 * @param  {fileReaderCallback} options.fileReaderEnabled Функция вызываемая, после того как FileReader загрузит файл
 * @param {notFileReaderCallback} options.fileReaderDisabled Сумма Функция вызываемая, если FileReader API не доступно
 */

 /**
 * Callbacks для uploadPhoto.
 *
 * @callback fileReaderCallback
 * @param {Object} e - объект event события FileReader.onload
 *
 * @callback notFileReaderCallback
 * @param {Object} e - объект event события input.change
 */

var uploadPhoto = function() {

    if (window.File && window.FileReader && window.FileList && window.Blob) {

        uploadPhoto = function(options) {
            for (var i = 0; i < options.input.files.length; i++) {
                var reader = new FileReader;

                reader.readAsDataURL( options.input.files[i] );
                reader.onload = function (e) { // Как только картинка загрузится
                    if (typeof options.fileReaderEnabled === 'function') {
                        options.fileReaderEnabled(e);
                    }
                };
            }
        };

    } else {

        uploadPhoto = function(options) {
            if (typeof options.fileReaderDisabled === 'function') {
                options.fileReaderDisabled();
            }
        }
    }
};

uploadPhoto();

var _getFileName = function(input) {
    var val = input.value;

    if (!val) return false;

    val = val.split('\\');

    return val[val.length - 1];
};

var _addListenFile = function () {

    $('.js-avatar-upload').on('change', function(e) {

        var $this = $(this),
            $wrapper = $this.closest('.add-photo'),
            $ava = $wrapper.find('.add-photo__avatar');

        uploadPhoto({
            input: this,

            fileReaderEnabled: function(e) {
                $ava.attr({
                    src: e.target.result,
                    srcset: e.target.result + ' 2x'
                });
                $wrapper.addClass('add-photo_uploaded');
            },

            fileReaderDisabled: function() {
                var fileName = _getFileName(e.target);

                if (!fileName) return;

                $wrapper.addClass('add-photo_uploaded');

                $ava.attr({
                    src: '',
                    alt: fileName
                });
            }
        });

    });

    $('body').on('change', '.js-upload-photo', function (e) {

        var $this = $(this),
            $inputClone = $this.clone(),
            $template = $(
                '<li class="add-photo__item-wrapper">' +
                    '<div class="user-photo add-photo__item">' +
                        '<div class="user-photo__img-wrapper"><img src="" ' +
                            ' class="user-photo__img add-photo__img" alt="" role="presentation">' +
                        '</div>' +
                        '<button title="Удалить фотографию" class="user-photo__remove">Удалить фотографию' +
                        '</button>' +
                    '</div>' +
                '</li>');

        $this.after($inputClone);

        uploadPhoto({
            input: this,

            fileReaderEnabled: function(e) {
                $template.find('.add-photo__img').attr('src', e.target.result);
                $('.add-photo__list').prepend($template);

                _addRemoveFile($template.find('.user-photo__remove'));


                $template.find('.add-photo__item').append($this);

                
                // $this.val('');
            },

            fileReaderDisabled: function() {
                var fileName = _getFileName(e.target);

                if (!fileName) return;

                $template.find('.user-photo__img').attr({
                    'alt': fileName,
                    'src': ''
                });

                $this.closest('.add-photo__item-wrapper').before($template);

                _addRemoveFile($template.find( '.user-photo__remove' ));

                $this.val('');
            }
        });
    });

    $('body').on('change', '.js-upload-photo-simple', function (e) {
        var $this = $(this),
            $inputClone = $this.clone(),
            $template = $(
                '<li class="add-photo__item-wrapper add-photo__item-wrapper_change">' +
                '<div class="user-photo add-photo__item">' +
                '<div class="user-photo__img-wrapper"><img src="" ' +
                ' class="user-photo__img add-photo__img" alt="" role="presentation">' +
                '</div>' +
                '<button title="Удалить фотографию" class="user-photo__remove">Удалить фотографию' +
                '</button>' +
                '</div>' +
                '</li>');

        $this.after($inputClone);

        uploadPhoto({
            input: this,

            fileReaderEnabled: function(e) {
                $template.find('.add-photo__img').attr('src', e.target.result);
                if ($('.add-photo__item-wrapper_change').length) {
                    $('.add-photo__list').find('.add-photo__item-wrapper_change').replaceWith($template);
                } else {
                    $('.add-photo__list').prepend($template);
                }

                _addRemoveFile($template.find('.user-photo__remove'));

                $template.find('.add-photo__item').append($this);
            },

            fileReaderDisabled: function() {
                var fileName = _getFileName(e.target);

                if (!fileName) return;

                $template.find('.user-photo__img').attr({
                    'alt': fileName,
                    'src': ''
                });

                $this.closest('.add-photo__item-wrapper').before($template);

                _addRemoveFile($template.find( '.user-photo__remove' ));

                $this.val('');
            }
        });
    });
};

var _addRemoveFile = function ( btn ) {

    var remove = function ( btn ) {
        btn.closest('.add-photo__item-wrapper').remove();
        btn.closest('.cabinet__user-photo').remove();
    };

    if ( btn ) {
        btn.on( 'click', function (event) {
            event.preventDefault();
            remove($( this ));
        } );
        return;
    }

    var blocks = $('.user-photo__remove');

    blocks.on('click', function (event) {
        event.preventDefault();
        remove($( this ));
    } );

};

module.exports = {
    init: init
}
