$(document).ready(function(){
    'use strict';

    var items = $('.gallery .item-container'),
        totalItems = items.length;

    items.click(function() {

        $('<div id="overlay"></div>')
            .css('opacity', '0')
            .animate({'opacity' : '0.5'}, 'slow')
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


    // admin



    var removeClick = function(){
        $('.upload-text').unbind();
        $('.remove-text').click(function() {
            $('.remove-text span').html('No');
            $('.remove-text').addClass('white red-hover no');
            $('.upload-text').html('<i class="fa fa-check"></i> <span>Yes</span>');
            $('.upload-text').addClass('white green-hover yes');
            console.log('.remove-text span');
            //$('.remove-text').click(function() {
            //    $("#remove-form").submit();
            //    console.log('delete');
            //});

            $('.remove-text.no').click(function() {
                $('.remove-text span').html('Remove');
                $('.remove-text').removeClass('white red-hover no');
                $('.upload-text').html('<i class="fa fa-upload"></i> <span>Upload</span>');
                $('.upload-text').removeClass('white green-hover yes');
                removeClick();
            });

            $('.upload-text.yes').click(function(event) {
                event.preventDefault();
                $('#remove-form').submit();
            });
        });
    };
    removeClick();

});
