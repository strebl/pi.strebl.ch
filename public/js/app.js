(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(document).ready(function () {

    moment.locale('en', {
        relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }
    });

    var serverOffset = moment($('meta[name=server-time]').attr('content')).diff(new Date()) + 1000;

    var pusher = new Pusher($('meta[name=pusher-key]').attr('content'));
    var channel = pusher.subscribe($('meta[name=pusher-channel]').attr('content'));

    channel.bind('DeviceWasDeleted', function (data) {
        $('#device-' + data.device.id).remove();

        if (!$('.device-row').length) {
            $('.js-no-devices').removeClass('hidden');
            $('#device-table').addClass('hidden');
        }
    });

    channel.bind('ServerWasPoked', function (data) {
        var device = $('#device-' + data.device.id);

        if (device.length) {
            device.find('.device-name').text(data.device.name);
            device.find('.device-ip').text(data.device.ip);
            device.find('.device-updated_at').text(moment(data.device.updated_at).from(moment(data.device.server_time))).data('timestamp', data.device.updated_at);
        } else {
            var newRow = "<tr class=\"device-row\" id=\"device-" + data.device.id + "\"> \
                    <td class=\"device-name\">" + data.device.name + "</td> \
                    <td class=\"device-ip\">" + data.device.ip + "</td> \
                    <td data-timestamp=\"" + data.device.created_at + "\" class=\"device-created_at\">" + moment(data.device.created_at).subtract(serverOffset, 'milliseconds').fromNow() + "</td> \
                    <td data-timestamp=\"" + data.device.updated_at + "\" class=\"device-updated_at\">" + moment(data.device.updated_at).subtract(serverOffset, 'milliseconds').fromNow() + "</td> \
                </tr>";

            $('#device-table tr:last').after(newRow);
        }

        if ($('.device-row').length) {
            $('.js-no-devices').addClass('hidden');
            $('#device-table').removeClass('hidden');
        }
    });

    var updateTime = function updateTime() {
        $('.device-updated_at').each(function () {
            $(this).text(moment($(this).data('timestamp')).subtract(serverOffset, 'milliseconds').fromNow());
        });
    };

    setInterval(updateTime, 1000);
});

},{}]},{},[1]);

//# sourceMappingURL=app.js.map
