$(document).ready(function(){
        var boxes = $('.item-container');
        var items = $('.item');

        boxes.css('cursor', 'move');

        $( "#sortable" ).sortable({
            start: function (event, ui) {
                ui.item.addClass('drag');

                $('.ui-sortable-placeholder').css({
                    height: items.height(),
                    float: 'left'
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
                      console.log(data);
                    }
                });

                $('body').append('<div class="success"><span>Changed order!</span></div>')

                setTimeout(function() {
                    $('.success, .error, .info').css('bottom', '-60px');
                }, 3000);

                $('.success, .error, .info').click(function() {
                    $('.success, .error, .info').css('bottom', '-60px');
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

});
