'use strict';

/**
 * Created by snatvb on 18.04.2016.
 */

window.Events = (function () {
    var Events = function () {
        return this.init();
    };

    Events.prototype = {
        init: function () {
            this.ev = [];
            return this;
        },
        on: function ( eventName, f ) {
            if ( !f ) return;
            var e = {
                name: eventName,
                f: f
            };
            this.ev.push( e );
        },
        trigger: function ( eventName, args ) {
            for ( var i = 0; i < this.ev.length; i++ ) {
                if ( this.ev[ i ].name == eventName ) {
                    this.ev[ i ].f( args );
                }
            }
        }
    };

    Events.prototype.emmit = Events.prototype.trigger;

    return new Events;
})();