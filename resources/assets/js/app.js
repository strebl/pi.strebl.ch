var moment    = require('moment');
require('pusher-js');
require('prismjs');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-bash');

moment.updateLocale('en', {
    relativeTime: {
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

var pusher = new Pusher(
    document.querySelector('meta[name=pusher-key]').getAttribute('content')
);
var channel = pusher.subscribe(
    document.querySelector('meta[name=pusher-channel]').getAttribute('content')
);

channel.bind('ServerWasPoked', function(data) {
    app.updateDevice(data.device);
});

channel.bind('DeviceWasDeleted', function(data) {
    app.removeDevice(data.device.id);
});

Vue.component('device', {
    props: ['device', 'currentTime'],
    template: '#device-template',
    computed: {
        creationTime() {
            return moment(this.device.device_added).from(this.currentTime);
        },
        relativeTime() {
            return moment(this.device.last_contact).from(this.currentTime);
        }
    },
});

var app = new Vue({
    el: '#app',
    data: {
        devices: [],
        group: window.location.pathname.split('/')[1] || '',
        currentTime: moment(),
        serverTimeOffset: 0,
    },
    computed: {
        noActiveDevices() {
            return this.devices.length == 0;
        }
    },
    ready() {
        this.$http.get('/api/v1/devices/' + this.group).then(function (response) {
            this.$set('devices', response.data.data);
            this.$set('serverTimeOffset', moment(response.data.server_time).diff(new Date()));
        });

        this.startTimer();
    },
    methods: {
        startTimer() {
            var vm = this;
            setInterval(function() {
                vm.currentTime = moment().subtract(vm.serverTimeOffset, 'milliseconds');
            }, 1000);
        },
        removeDevice(id) {
            this.devices = this.devices.filter(device => {
                return device.id != id;
            });
        },
        updateDevice(device) {
            this.removeDevice(device.id);
            this.devices.push(device);
        }
    }
})
