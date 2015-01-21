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

    var removeText = $('.remove-text'),
        uploadText = $('.upload-text');

    var removeClick = function(){

        $('.remove-text').click(function() {
            removeText.find('span').html('No');
            removeText.addClass('white red-hover no');
            uploadText.html('<i class="fa fa-check"></i> <span>Yes</span>');
            uploadText.addClass('white green-hover yes');

            //$('.remove-text').click(function() {
            //    $("#remove-form").submit();
            //    console.log('delete');
            //});

            removeText.click(function() {
                removeText.find('span').html('Remove');
                removeText.removeClass('white red-hover no');
                uploadText.html('<i class="fa fa-upload"></i> <span>Upload</span>');
                uploadText.removeClass('white green-hover yes');
                uploadText.unbind();
                uploadClick();
                removeClick();
            });

            uploadText.click(function(event) {
                event.preventDefault();
                $('#remove-form').submit();
            });
        });
    };
    removeClick();

    var uploadClick = function() {
        uploadText.click(function(event) {
            event.preventDefault();
            $(".popup-form")
            .css({
                'opacity' : 0,
                'display' : 'block'
            })
            .animate({'opacity' : '1'}, 'slow')

            $('.popup-form').css('margin-top', -($('.popup-form').height() / 2) );

            $('<div id="overlay" class="no-pointer"></div>')
                .css('opacity', '0')
                .animate({'opacity' : '0.8'}, 'slow')
                .appendTo('body');

            $('.button-submit').click(function(event) {
                if ($('.input-file').hasClass('empty')) {
                    event.preventDefault();
                    $('.files-selected').html('Select atleast one photo');
                };
            });

            $('.button-cancel').click(function() {
                $('.popup-form').css('display', 'none');
                $('#overlay').remove();
            });

            $('.fake-input-file').click(function(event) {
                event.preventDefault();
                $('.input-file').trigger('click');
            });

            $('.input-file').change(function () {
                if (this.files.length == 0) {
                    $('.input-file').addClass('empty');
                } else {
                    $('.input-file').removeClass('empty');
                };
                $('.files-selected').html(this.files.length + " photo(s) selected");
            });
        });
    };
    uploadClick();


});
