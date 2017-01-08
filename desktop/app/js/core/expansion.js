'use strict';

/**
 * Created by snatvb on 18.04.2016.
 */

//String.prototype.replaceAll = function(search, replacement) {
//    return this.replace(new RegExp(search, 'g'), replacement);
//};

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        'use strict';
        var O = Object(this),
            len = parseInt(O.length, 10) || 0;

        if (len === 0) {
            return false;
        }

        var n = parseInt(arguments[1], 10) || 0,
            k;

        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            
            if (k < 0) {
                k = 0;
            }
        }

        var currentElement;

        while (k < len) {
            currentElement = O[k];

            if (searchElement === currentElement) { // NaN !== NaN
                return true;
            }

            k++;
        }
        
        return false;
    };
}
