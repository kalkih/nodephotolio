$(document).ready(function(){
    'use strict';
    var top = $('.top');

    $(window).scroll(function() {
        console.log($(window).scrollTop());
        if ($(window).scrollTop() == 0) {
            top.removeClass('show');
        } else {
            top.addClass('show');
        }
    });

});
