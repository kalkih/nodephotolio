$(document).ready(function(){
    'use strict';
    var currentSlide = 0,
        slides = $('#slideshow .slide'),
        totalSlides = slides.length;

    var showCurrentSlide = function(){
        var slideToShow = Math.abs(currentSlide%totalSlides);
        slides.removeClass('show');
        slides.eq(slideToShow).addClass('show');
        slides.eq((currentSlide - 2)%totalSlides).removeClass('animation');
        slides.eq(slideToShow).addClass('animation');
    };

    var interval = setInterval(function() {
        currentSlide++;
        showCurrentSlide();

    }, 6000);

    showCurrentSlide();

});
