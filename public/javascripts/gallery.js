$(document).ready(function(){
    'use strict';

    var items = $('.gallery .item-container'),
        totalItems = items.length;

    items.click(function() {

        $('<div id="overlay"></div>')
            .css('opacity', '0')
            .animate({'opacity' : '0.5'}, 'fast')
            .appendTo('body');

        $('<div id="lightbox"></div>')
            .hide()
            .appendTo('body');

        var img = $(this).find('img'),
            src = img.attr('src').replace('/thumb/', '/');

        $('<img class="lightbox-img img-responsive">')
            .attr('src', src)
            .load(function() {
                $('#lightbox')
                .fadeIn();
            })
            .appendTo('#lightbox');

            // Remove it all on click
            $('#overlay, #lightbox').click(function() {
                $('#overlay, #lightbox').remove();
            });

    });
});
