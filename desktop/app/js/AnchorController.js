'use strict';

/**
 * Created by snatvb on 18.04.2016.
 */

var AnchorController = (function () {
    var exportObj = {};

    var init = function () {
        Events.on('AddActModule.change', function ( data ) {
            control(data);
        });
    };

    var control = function ( data ) {
        window.location = window.location.pathname + '#' + data;
    };


    exportObj.init = init;

    return exportObj;

})();
