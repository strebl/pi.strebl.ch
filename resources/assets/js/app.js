import 'es6-promise/auto'
import Vue from 'vue';
import App from './App.vue';
import bus from './bus';
import moment from 'moment';
import 'pusher-js';
import 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';

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
    document.querySelector('meta[name=pusher-key]').getAttribute('content'),
    {
        encrypted: true
    }
);
var channel = pusher.subscribe(
    document.querySelector('meta[name=pusher-channel]').getAttribute('content')
);

channel.bind('ServerWasPoked', function(data) {
    bus.$emit('ServerWasPoked', data.device)
});

channel.bind('DeviceWasDeleted', function(data) {
    bus.$emit('DeviceWasDeleted', data.device.id)
});

new Vue({
    components: {
        App
    }
}).$mount('#app')
