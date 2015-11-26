global.$      = require('jquery');
global.jQuery = require('jquery');
var moment    = require('moment');
require('sweetalert');
require('pusher-js');
require('prismjs');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-bash');

$(document).ready(function(){

    moment.locale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s:  "%d seconds",
            m:  "a minute",
            mm: "%d minutes",
            h:  "an hour",
            hh: "%d hours",
            d:  "a day",
            dd: "%d days",
            M:  "a month",
            MM: "%d months",
            y:  "a year",
            yy: "%d years"
        }
    });

    var serverOffset = moment($('meta[name=server-time]').attr('content')).diff(new Date()) + 1000;

    var pusher = new Pusher($('meta[name=pusher-key]').attr('content'));
    var channel = pusher.subscribe($('meta[name=pusher-channel]').attr('content'));

    channel.bind('DeviceWasDeleted', function(data) {
        $('#device-' + data.device.id).remove();

        if(! $('.device-row').length) {
            $('.js-no-devices').removeClass('hidden');
            $('#device-table').addClass('hidden');
        }
    });

    channel.bind('ServerWasPoked', function(data) {
        var device = $('#device-' + data.device.id);

        if( device.length ) {
            device.find('.device-name').text(data.device.name);
            device.find('.device-ip').text(data.device.ip);
            device.find('.device-updated_at').text(moment(data.device.updated_at).from( moment(data.device.server_time) )).data('timestamp', data.device.updated_at);
        } else {
            var newRow = "<tr class=\"device-row\" id=\"device-" + data.device.id + "\"> \
                    <td class=\"device-name\">" + data.device.name + "</td> \
                    <td class=\"device-ip\">" + data.device.ip + "</td> \
                    <td data-timestamp=\"" + data.device.created_at + "\" class=\"device-created_at\">" + moment(data.device.created_at).subtract(serverOffset, 'milliseconds').fromNow() + "</td> \
                    <td data-timestamp=\"" + data.device.updated_at + "\" class=\"device-updated_at\">" + moment(data.device.updated_at).subtract(serverOffset, 'milliseconds').fromNow() + "</td> \
                </tr>";

            $('#device-table tr:last').after(newRow);
        }

        if($('.device-row').length) {
            $('.js-no-devices').addClass('hidden');
            $('#device-table').removeClass('hidden');
        }
    });

    var updateTime = function() {
        $('.device-updated_at').each(function() {
            $(this).text( moment( $(this).data('timestamp')).subtract(serverOffset, 'milliseconds').fromNow() );
        });
    }

    setInterval(updateTime, 1000);

});