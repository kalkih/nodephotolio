$(document).ready(function(){
        var boxes = $('.item-container');

        $( "#sortable" ).sortable({
            start: function (event, ui) {
                ui.item.addClass('drag');
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
                    url: '/dashboard/order'
                });
            },

            stop: function (event, ui) {
                ui.item.removeClass('drag');
            },
        });

        $( "#sortable" ).disableSelection();

});
