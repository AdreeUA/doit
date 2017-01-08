var animationsModule = (function() {

    'use strict';

    var exportObj = {};

    // taken from mo.js demos
    function isIOSSafari() {

        var userAgent;
        userAgent = window.navigator.userAgent;
        return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);

    };

    // taken from mo.js demos
    function isTouch() {

        var isIETouch;
        isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;

    };

    // taken from mo.js demos
    var isIOS = isIOSSafari(),
        clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }

        return a;
    }

    function Animocon(el, options) {
        this.el = el;
        this.options = extend( {}, this.options );
        extend( this.options, options );

        this.checked = false;
        if($(this.el).hasClass('like-button_checked'))
        {
            this.checked = true;
        }

        this.timeline = new mojs.Timeline();

        for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
            this.timeline.add(this.options.tweens[i]);
        }

        var self = this;
        this.el.addEventListener(clickHandler, function() {
            if( self.checked ) {
                self.options.onUnCheck();
            }
            else {
                self.options.onCheck();
                self.timeline.start();
            }
            self.checked = !self.checked;
        });
    }

    Animocon.prototype.options = {
        tweens : [
            new mojs.Burst({
                shape : 'circle',
                isRunLess: true
            })
        ],
        onCheck : function() { return false; },
        onUnCheck : function() { return false; }
    };

    var _likeButtonsAnimation = function() {

        var $likeBtn = $('.like-button');

        var scaleCurve4 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');

        $likeBtn.each(function() {

            var $this = $(this),
                that = this,
                icon = that.querySelector('.like-button__icon'),
                currentColor = that.style.color;

            new Animocon(that, {
                tweens : [
                    // burst animation
                    new mojs.Burst({
                        parent: that,
                        duration: 1500,
                        shape : 'circle',
                        fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                        x: '50%',
                        y: '50%',
                        opacity: 0.6,
                        childOptions: { radius: {20:0} },
                        radius: {40:120},
                        count: 6,
                        isSwirl: true,
                        isRunLess: true,
                        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                    }),
                    new mojs.Tween({
                        duration : 900,
                        onUpdate: function(progress) {
                            var scaleProgress = scaleCurve4(progress);
                            icon.style.WebkitTransform = icon.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
                        }
                    })
                ],

                onCheck : function() {
                    that.style.color = '#50e3c2';
                    $this.addClass('like-button_checked');
                },

                onUnCheck : function() {
                    that.style.color = currentColor;
                    $this.removeClass('like-button_checked')
                }
            });

        });

    };

    exportObj.init = function() {
        if (userAuth) {
            _likeButtonsAnimation();
        }
    };

    return exportObj;

})();
