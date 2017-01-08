'use strict';

/**
 * Created by snatvb on 20.04.2016.
 */

var PreviewImage = function (stgs) {
    this.stgs = stgs || {};
    return this.init();
};

PreviewImage.prototype = {
    init: function () {
        if (!this.stgs || typeof this.stgs != 'object') {
            return this;
        }
        this.initaled = true;

        this._setStgs();

        this.item = $(this.stgs.item);
        this.template = $(this.stgs.template);

        this._binded();
    },
    _setStgs: function () {
        var s = this.stgs;
        this.stgs = {
            template: s.template,
            item: s.item,
            onChange: s.onChange,
            howAdd: s.howAdd.replace(' ', '') || 'before',
            loadedClass: s.loadedClass || 'PreviewImage-loaded'
        };

        this.cached = {};

    },
    _binded: function () {
        var self = this;
        this.item.on('change', function ( e ) {
            self.onChange(this, $(this), e);
        });
    },
    onChange: function ( element, $element, e ) {
        var $tmpl, self = this;
        if ( window.File && window.FileReader && window.FileList && window.Blob ) {
            for ( var i = 0; i < e.target.files.length; i++ ) {
                var reader = new FileReader;
                reader.readAsDataURL( e.target.files[ i ] );
                $tmpl = this.template.clone();
                (function ( $tmpl, maxIndex, index ) {
                    reader.onload = function ( e ) { // Как только картинка загрузится
                        //$('.add-photo__img' ).attr('src', e.target.result);
                        self._rendered(e, $tmpl, maxIndex, index);
                    }
                })( $tmpl, (e.target.files.length - 1), i );
            }
        }
    },
    _rendered: function ( e, $tmpl, maxIndex, index ) {
        var parent = this.item.parents('.j-PreviewView-parent').length ? this.item.parents('.j-PreviewView-parent') : this.item.parent(),
            howAdd = this.stgs.howAdd.replace(' ', '').split(',');
        $tmpl.find( 'img' ).attr( 'src', e.target.result );
        $('.j-PreviewRemoveRender' ).remove();
        if (howAdd.includes('replace-input'))
            this._renderedReplace($tmpl, parent);
        if (howAdd.includes('cached'))
            $tmpl = this._renderedCached($tmpl, parent, index);
        if (howAdd.includes('before'))
            this._renderedBefore($tmpl, parent);
        if (howAdd.includes('remove'))
            this._addRemoved($tmpl, parent);

        this.cached.tmpl = $tmpl;
    },
    _addRemoved: function ($tmpl, parent) {
        $tmpl.on('click', '.j-PreviewImage-remove', function (event) {
            event.preventDefault();
            $tmpl.remove();
        });
    },
    _renderedBefore: function ($tmpl, parent) {
        parent.before($tmpl);
    },
    _renderedCached: function ($tmpl, parent, index) {
        if (index == 0 ) $('.j-PreviewImage-Cached').remove();
        $tmpl.addClass('j-PreviewImage-Cached');
        return $tmpl;
    },
    _renderedReplace: function ($tmpl, parent) {
        if (this.cached.tmpl) this.cached.tmpl.remove();
        if (!parent.hasClass(this.stgs.loadedClass)) parent.addClass(this.stgs.loadedClass);
        this.item.before($tmpl);
        // this.item.hide();
    }
};

var PreviewImages = function ( template, items, howAdd ) {
    var res = [];
    for(var i = 0; i < items.length; i++){
        res.push(new PreviewImage({
            template: template,
            item: items[i],
            howAdd: howAdd
        }));
    }
    return res;
};
