$(function() {

    var app      = require('./modules/app'),
        donation = require('./modules/donation'),
        select   = require('./modules/select'),
        like     = require('./modules/like'),
        slider   = require('./modules/slider'),
        addPhoto = require('./modules/add-photo'),
        tabs     = require('./modules/tabs'),
        toggle   = require('./modules/toggle'),
        burgerBtn = require('./modules/burger-btn'),
        header   = require('./modules/header'),
        customInput = require('./modules/custom-input'),
        maskedInput = require('./modules/masked-input'),
        popup    = require('./modules/popup'),
        battery  = require('./modules/battery'),
        supporter = require('./modules/supporter'),
        datepicker = require('./modules/datepicker');


    app.init();
    donation.init();
    select.init();
    tabs.init();
    like.init();
    slider.init();
    addPhoto.init();
    toggle.init();
    header.init();
    customInput.init();
    maskedInput.init();
    popup.init();
    battery.init();
    supporter.init();
    datepicker.init();

});
