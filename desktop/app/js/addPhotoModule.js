'use strict';

/**
 * Created by snatvb on 10.03.2016.
 */

var AddPhotoModule = (function () {
    var init = function () {
        _addListenFile();
        _addRemoveFile();
    };
    
    var _addListenFile = function () {
        var $template = $( '<li class="add-photo__item-wrapper">' +
            '<div class="user-photo add-photo__item">' +
            '<div class="user-photo__img-wrapper"><img src="" ' +
            'class="user-photo__img add-photo__img" alt="" role="presentation">' +
            '</div>' +
            '<button title="Удалить фотографию" class="user-photo__remove">Удалить фотографию' +
            '</button>' +
            '</div>' +
            '</li>' );
        var loadCount = 0;

        // Замена изображения друг на друга

        $( 'body' ).on( 'change', '.j-upload-photo-simple', function ( e ) {
            var $tmpl, $this = $(this), $self =  $(this).clone();

            if ( window.File && window.FileReader && window.FileList && window.Blob ) {

                for ( var i = 0; i < e.target.files.length; i++ ) {
                    var reader = new FileReader;

                    reader.readAsDataURL( e.target.files[ i ] );
                    $tmpl = $template.clone();

                    $this.after($self);

                    reader.onload = function (e) {

                        $tmpl.find('.add-photo__img').attr('src', e.target.result);
                        $('.add-photo__list').html($tmpl);

                        _addRemoveFile($tmpl.find('.user-photo__remove'));

                        $tmpl.find('.add-photo__item').append($this);

                    };
                }

            } else {
                var val = e.target.value;
                if ( !val ) return;
                val = val.split( '\\' );
                $tmpl = $template.clone();
                $tmpl.find( '.user-photo__img-wrapper' ).html( val[ val.length - 1 ] );
                $this.parents( '.add-photo__item-wrapper' ).before( $tmpl );
                _addRemoveFile( $tmpl.find( '.user-photo__remove' ) );
            }
        });
        
        $( 'body' ).on( 'change', '.j-upload-photo', function ( e ) {
            var $tmpl, $this = $(this), $self =  $(this).clone();
            
            if ( window.File && window.FileReader && window.FileList && window.Blob ) {
                
                for ( var i = 0; i < e.target.files.length; i++ ) {
                    var reader = new FileReader;
                    
                    reader.readAsDataURL( e.target.files[ i ] );
                    $tmpl = $template.clone();
                    
                    $this.after($self);

                    reader.onload = function (e) {

                        $tmpl.find('.add-photo__img').attr('src', e.target.result);
                        $('.add-photo__list').prepend($tmpl);

                        _addRemoveFile($tmpl.find('.user-photo__remove'));

                        $tmpl.find('.add-photo__item').append($this);

                    };
                }

            } else {
                var val = e.target.value;
                if ( !val ) return;
                val = val.split( '\\' );
                $tmpl = $template.clone();
                $tmpl.find( '.user-photo__img-wrapper' ).html( val[ val.length - 1 ] );
                $this.parents( '.add-photo__item-wrapper' ).before( $tmpl );
                _addRemoveFile( $tmpl.find( '.user-photo__remove' ) );
            }
        });
    };

    var _addRemoveFile = function ( btn ) {
        var remove = function ( btn ) {
            var
                uploadInputs = $('.j-upload-photo-input'),
                parent = btn.parents( '.add-photo__item-wrapper' ),
                parentIndex = parent.index();
                
            uploadInputs.eq(parentIndex).remove();
            parent.remove();
            btn.parents( '.cabinet__user-photo' ).remove();
        };
        if ( btn ) {
            btn.on(  'click', function ( event ) {
                event.preventDefault();
                remove( $( this ) );
            } );
            return;
        }
        var blocks = $( '.user-photo__remove' );
        blocks.on( 'click', function ( event ) {
            event.preventDefault();
            remove( $( this ) );
        } );
    };

    //add
    function handleFileSelect(event) {
        var files = event.target.files;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            renderFileInfo(file);
        }
    }

    function onFileLoad($input, callback) {
        var file = $input.get(0).files[0],
            reader = new FileReader();

        reader.onload = (function(imageFile) {
            return function(e) {
                callback(e);
            }
        })(file);

        reader.readAsDataURL(file);
    }

    // $(function() {
    //     var $fileInput = $('.js-file-box[type=file]');
    //     var $imageArea = $('.add-photo__img ');
    //     var fileInfo;

    //     $fileInput.on('change', getFileInfo);

    // });

    $('.js-remove-img').on('click', function () {
        $('.user-photo').remove();
    });
    
    $('body').on('click', '.js-remove-list', function () {
        $(this).parents('.report-block__months-item').get(0).remove();
    });

    $('body').on('click', '.js-remove-img', function () {
        console.log(this);
        $(this).closest('.add-photo__item-wrapper').remove();

    });

    $( function(){
        $( '.js-file-box' ).each( function(){
            var $input     = $( this ),
                $label     = $input.next( 'label' ),
                labelVal = $label.html();

            $input.on( 'change', function( e )
            {
                var fileName = '';

                if( this.files && this.files.length > 1 )
                    fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                else if( e.target.value )
                    fileName = e.target.value.split( '\\' ).pop();

                if( fileName )
                    $label.find( 'span' ).html( fileName );
                else
                    $label.html( labelVal );
            });

            // Firefox bug fix
            $input
                .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
                .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
        });
    });
    
    return { 
        init: init,
        onFileLoad: onFileLoad
    };
})();
