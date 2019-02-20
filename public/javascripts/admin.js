$(document).ready(function(){
    var boxes = $('.item-container');
    var items = $('.item');

    $( "#sortable" ).sortable({
        start: function (event, ui) {
            ui.item.addClass('drag');

            $('.ui-sortable-placeholder').css({
                height: items.height(),
                float: 'left',
            });

            items.css('height', items.height());

            ui.helper.css('margin-top', $(window).scrollTop() );
        },

        update: function (event, ui) {
            var data = [];

            $(this).children('li').each(function(index, element) {
                data.push($(this).attr('photoID'))
            });

            $.ajax({
                data: {
                    data: data
                },
                type: 'PUT',
                url: '/dashboard/order',
                success:function(data) {
                    flash(data.msg, data.type);
                }
            });
        },

        stop: function (event, ui) {
            ui.item.removeClass('drag');
            items.css('height', 'auto');
        },

        beforeStop: function (event, ui) {
            ui.helper.css('margin-top', 10 );
        },
    });

    $( "#sortable" ).disableSelection();

    /* Admin hover effect */
    boxes.mouseover(function(event) {
        var fig = $(this).find('figcaption');
        fig.css('display', 'block');
        fig.css({
            height: $(this).height(),
            width: $(this).width(),
            fontSize: ($(this).width() / 6)
        });
        var remove = $(this).find('.first');
        var star = $(this).find('.second');

        star.css('margin-left', ($(this).width() / 6));


        var removeClick = function(){
            remove.unbind('click').click(function (e) {});
            remove.click(function(e) {
                e.stopPropagation();
                if (remove.hasClass('fa-remove')) {
                    remove
                        .removeClass('fa-remove')
                        .addClass('fa-check');
                    fig.find('.fig-container').prepend('<span>Confirm</span>')

                    fig.find('span').css('font-size', (fig.width() / 8));

                    star.css('display', 'none');
                } else {
                    remove.unbind('click').click(function (e) {});
                    e.stopPropagation();
                    var id = $(this).attr('photoID');

                    $(this)
                        .removeClass('fa-check')
                        .addClass('fa-remove');
                    star
                        .removeClass('fa-remove')
                        .addClass('fa-star');
                    fig.find('p').remove();
                    $.ajax({
                        type: 'DELETE',
                        url: '/dashboard/image/' + $(this).attr('photoID')
                    });
                    flash('Photo removed!', 'success');
                    var ele = $(".item[photoID='"+ id + "'");
                    ele.remove();
                }
            });
        };

        var starClick = function(){
            star.click(function(e) {
                e.stopPropagation();
                flash('Feature coming soon...', 'info');
            });
        };
        removeClick();
        starClick();
    });

    boxes.mouseleave(function(event) {
        var fig = $(this).find('figcaption');
        fig.css('font-size', '0px');
        fig.css('display', 'none');
        var remove = $(this).find('.first');
        var star = $(this).find('.second');

        remove
            .removeClass('fa-check')
            .addClass('fa-remove');
        star.css('display', 'inline-block');
        fig.find('span').remove();
    });

    /* upload form */
    $('.new-text').click(function() {

        $("<div class='popup-form'><form class='form' id='login-form' method='POST' action='/dashboard/gallery/new'><p><input name='name' type='text' class='input' placeholder='Name' id='namefield' required=''/></p><p><input name='year' type='number' class='input' id='yearfield' placeholder='Year' value='2015' required=''/></p><p><select id='monthfield' name='month' class='input'><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>November</option><option>Decemeber</option></select></p><input type='submit' name='create' value='CREATE' class='button-blue' id='create'/><input type='reset' name='cancel' value='CANCEL' class='button-red button-cancel' id='cancel'/></form></div>")
        .css({
            'opacity' : 0,
            'display' : 'block'
        })
        .animate({'opacity' : '1'}, 'slow')
        .appendTo('#content');

        $('.popup-form').css('margin-top', -($('.popup-form').height() / 2) );

        $('<div id="overlay" class="no-pointer"></div>')
            .css('opacity', '0')
            .animate({'opacity' : '0.6'}, 'slow')
            .appendTo('body');

        $('.button-cancel').click(function() {
            $('.popup-form, #overlay').remove();
        });
    });


    /* Album */
    var removeText = $('.remove-text'),
        uploadText = $('.upload-text');

    var removeClick = function(){

        $('.remove-text').click(function() {
            removeText.find('span').html('No');
            removeText.addClass('white red-hover no');
            uploadText.html('<i class="fa fa-check"></i> <span>Yes</span>');
            uploadText.addClass('white green-hover yes');

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
