$(document).ready(function(){
    'use strict';
    var top = $('.top');

    $(window).scroll(function() {
        if ($(window).scrollTop() == 0) {
            top.removeClass('show');
        } else {
            top.addClass('show');
        }
    });

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if(isMobile.any()) {
        $('.mobile #slideshow').remove();
    }

    setTimeout(function() {
        $('.success, .error, .info').css('bottom', '-60px');
    }, 3000);

    $('.success, .error, .info').click(function() {
        $('.success, .error, .info').css('bottom', '-60px');
    });

    $('.new-text').click(function() {

        $("<div class='popup-form'><form class='form' id='login-form' method='POST' action='/dashboard/gallery/new'><p><input name='name' type='text' class='input' placeholder='Name' id='namefield' required=''/></p><p><input name='year' type='number' class='input' id='yearfield' placeholder='Year' value='2015' required=''/></p><p><select id='monthfield' name='month' class='input'><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>November</option><option>Decemeber</option></select></p><input type='submit' name='create' value='CREATE' class='button-blue' id='create'/><input type='reset' name='cancel' value='CANCEL' class='button-red button-cancel' id='cancel'/></form></div>")
        .css({
            'opacity' : 0,
            'display' : 'block'
        })
        .animate({'opacity' : '1'}, 'slow')
        .appendTo('#content');

        console.log(($('.popup-form').height() / 2));
        $('.popup-form').css('margin-top', -($('.popup-form').height() / 2) );

        $('<div id="overlay" class="no-pointer"></div>')
            .css('opacity', '0')
            .animate({'opacity' : '0.6'}, 'slow')
            .appendTo('body');

        $('.button-cancel').click(function() {
            $('.popup-form, #overlay').remove();
        });
    });
});
