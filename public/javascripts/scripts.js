$(document).ready(function(){
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

});

var flash = function(msg, type){
    $('body').append('<div class=' + type + '><span>' + msg + '</span></div>')
    setTimeout(function() {
        $('.success, .error, .info').css('bottom', '-60px');
    }, 3000);

    $('.success, .error, .info').click(function() {
        $('.success, .error, .info').css('bottom', '-60px');
    });
};
