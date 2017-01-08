var fundModule = (function () {

    var exportObj = {};

    var $form = $('#fund-registration-form'),
        $fields = $form.length ? $($form.get(0).elements) : null,
        $submitBtn = $form.find('.btn[type="submit"]');

    function init() {
        loadDoc();
        _setupPreview();
        if ($form.length) {
            regFundValidation();
        }

        $('.add-report').each(function() {
            _addReport($(this));
        });
    }

    var _setupPreview = function () {
        PreviewImages( '<div class="ovh max-block__height centriner centriner__wa">' +
            '<img class="max-img" src="" alt=""/></div>', $( '.j-preview-logo' ), 'replace-input' );
    };

    function regFundValidation() {
        var valid = true,
            $fieldForValidation = $fields.filter(':not([type="hidden"]):not([type="submit"])');

        $fieldForValidation.each(function() {
            var $field = $(this);

            if ($field.is('#fund-register-form-is_agree')) {
                if (!$field.prop('checked')) {
                    return valid = false;
                }
            }

            //if (!$field.val()) {
            //    return valid = false;
            //}
        });

        if (valid && $submitBtn.hasClass('btn_disabled')) {
            $submitBtn
                .removeClass('btn_disabled')
                .removeAttr('disabled');
        } else if (!valid && !$submitBtn.hasClass('btn_disabled')) {
            $submitBtn
                .addClass('btn_disabled')
                .attr('disabled', 'disabled');
        }

        return valid;
    }
    
    function loadDoc() {
        var $regDocList = $('.reg-docs-list'),
            $regDocItem = $regDocList.find('.reg-docs-list__item');

        function docInput($input) {
            var file = Object.create(null),
                $docItem = $input.closest('.reg-docs-list__item');

            file.fullName = $input.val().split('\\').pop();
            file.name = file.fullName.split('.');
            file.ext = file.name.pop();
            file.name = file.name.join();

            if(file.fullName) {
                var $inputDefaultText = $docItem.find('.upload-file__upload-word'),
                    $inputNewText = $docItem.find('.upload-file__change-word'),
                    $docName = $docItem.find('.reg-docs-list__value');

                if ($inputDefaultText.is(':visible')) {
                    $inputDefaultText.hide();
                    $inputNewText.show();
                }

                $docName.text(file.fullName);

                $docItem.addClass('reg-docs-list__item_active');
            }
        }

        $regDocItem.each(function() {
            var $this = $(this),
                $input = $this.find('.upload-file__input');

            docInput($input);
        });

        $regDocItem.on('change', function(e) {
            var $this = $(this),
                $target = $(e.target);

            docInput($target);
        });
    }

    function _addReport($block) {
        var template = '',
            $form = $block.is('form') ? $block : $block.find('form'),
            $inputs = $block.find('.add-report__input'),
            $submitBtn = $block.find('.add-report__btn'),
            $resultWrapper = $block.find('.add-report__result'),
            type = $block.data('type'),
            valid = false,
            ready = false,
            ajaxSubmit = (typeof window.FormData === 'function'),
            photo;

        $block.on('click', '.report-block__change', function() {
            var $monthFileInput = $inputs.filter('.add-report__input_month-file');
                $monthDateInput = $inputs.filter('.add-report__input_month');
                
            $monthDateInput.attr('value', $(this).attr('data-date'));
            $monthDateInput.val($(this).attr('data-date'));
            $monthFileInput.trigger('click');
            $monthFileInput.one('change', function(e) {
                var data;
                data = new FormData($form.get(0));
                data.append('form_type', 'month');

                _ajax(data);
            });
        });
            
        switch (type) {
            case 'year':
                template +=
                    '<li class="add-photo__item-wrapper">' +
                        '<div class="add-report__year"></div>' +
                        '<div class="user-photo add-photo__item">' +
                            '<div class="user-photo__img-wrapper">' +
                                '<img src="" class="user-photo__img add-photo__img" alt="" role="presentation">' +
                            '</div>' +
                            '<button title="Удалить отчет" class="year_report-block__remove user-photo__remove js-remove-img" data-id="0">' +
                                'Удалить отчет' +
                            '</button>' +
                        '</div>' +
                    '</li>';
                break;

            case 'month':
                template +=
                    '<li class="report-block__months-item">' +
                        '<div class="link-file">' +
                            '<svg class="link-file__icon">' +
                                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="i/icons.svg#icon-doc-min"></use>' +
                            '</svg>' +
                        '</div>' +
                        '<div class="report-block__actions">' +
                            '<a class="link-base report-block__change" href="javascript:void(0)"> изменить </a>' +
                            '<button title="Удалить" class="report-block__remove js-remove-list" data-id="0">' +
                                'Удалить' +
                            '</button>' +
                        '</div>' +
                    '</li>';
                break;
        }

        $block.on('submit', function(e) {
            if (ajaxSubmit || !ready) {
                e.preventDefault();
            }
        });

        $block.on('input change', function(e) {
            valid = true;

            $inputs.each(function() {
                var $this = $(this);
                if (!_validate($this)) {
                    valid = false;
                    return;
                }
            });

            if (valid) {
                $submitBtn.removeClass('btn_disabled');
            } else {
                $submitBtn.addClass('btn_disabled');
            }
        });

        $block.on('click', function(e) {
            var $target = $(e.target),
                $submitBtnClicked = $target.closest('.add-report__btn');

            if ($submitBtnClicked.length && valid) {
                var data,
                    $result = $(template);

                if (ajaxSubmit) {
                    data = new FormData($form.get(0));
                }

                if (type === 'year') {
                    data.set('form_type', 'year');

                    var $yearWrapper = $result.find('.add-report__year'),
                        $yearInput = $inputs.filter('.add-report__input_year'),
                        $year = $(document.createTextNode($yearInput.val()))
                        $poster = $result.find('.add-photo__img'),
                        $posterInput = $inputs.filter('.add-report__input_poster'),
                        $yearFile = $inputs.filter('.add-report__file_year'),
                        $deleteLink = $result.find('.report-block__remove');

                    $resultWrapper.find('.add-photo__item-wrapper').each(function() {
                        var $this = $(this),
                            year = parseInt($this.find('.add-report__year').text()),
                            newYear = parseInt($yearInput.val());

                        if (year === newYear) {
                            $this.remove();
                        }
                    });

                    $yearWrapper.append($year);

                    $('#add-report-block').arcticmodal();

                    AddPhotoModule.onFileLoad($posterInput, function(e) {
                        $poster.attr('src', e.target.result);
                    });

                    data.set('date', $yearInput.val());
                    data.set('doc_file', $yearFile.get(0).files[0]);
                    data.set('year_poster', $posterInput.get(0).files[0]);
                }
                else if (type === 'month') {
                    data.append('form_type', 'month');

                    var $wrapper = $result.find('.link-file'),
                        $monthInput = $inputs.filter('.add-report__input_month'),
                        monthNum = parseInt($monthInput.val().split('.')[0]),
                        year = $monthInput.val().split('.')[1],
                        monthes = ['Январь', 'Февраль', 'Март', 'Апрель',
                                   'Май', 'Июнь', 'Июль', 'Август',
                                   'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                        $text = $(document.createTextNode(monthes[monthNum - 1] + ' ' + year));

                    $resultWrapper.find('.report-block__months-item').each(function() {
                        var $this = $(this),
                            text = $this.find('.link-file').get(0).textContent.trim();

                        if ($text.text().trim() === text) {
                            $this.remove();
                        }
                    });

                    $wrapper.append($text);
                    
                    $result.find('.report-block__change').attr('data-date', $monthInput.val());
                    $('#add-report-block').arcticmodal();
                }
                else if (type == 'message') {
                    data.set('form_type', 'message');
                    data.set('report_description', $('#report_description').val());
                }

                $resultWrapper.append($result);

                _ajax(data);
            }
        });

        function _ajax(data) {
            ready = true;

            if (!ajaxSubmit) {
                $form.submit();
                return;
            }

            $.ajax({
                data: data,
                type: 'POST',
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function(databack) {
                    if (databack.reset) {
                        _reset();
                    }

                    if (databack.id) {
                        var $deleteLink = $('.report-block__remove').filter('[data-id=0]');
                        $deleteLink = $deleteLink.length ? $deleteLink : $('.user-photo__remove').filter('[data-id=0]')
                        $deleteLink.data('id', databack.id);
                        $deleteLink.attr('data-id', databack.id);
                    }
                }
            });
        }

        function _validate($input) {
            if ($input.hasClass('.js-input-mask')) {
                return $input.inputmask("isComplete");
            } else {
                return !!$input.val().length;
            }
        }

        function _reset() {
            $inputs.each(function() {
                var $this = $(this);

                $this
                    .val('')
                    .trigger('change');
            });

            ready = false;
        }
    }

    $(document).on('click', '.report-block__remove, .year_report-block__remove', function () {
        $.ajax({
            data: {'form_type': 'delete', 'id': $(this).data('id')},
            type: 'POST'
        });
    });

    $form.on('change', regFundValidation);

    exportObj.init = init;
    return exportObj;

})();
