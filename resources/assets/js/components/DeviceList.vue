<template>
<table class="table" id="device-table">
    <tbody>
        <tr>
            <th>Name</th>
            <th>IP</th>
            <th>Added</th>
            <th>Last Contact</th>
        </tr>
        <tr is="device"
            v-for="device in devices"
            :key="device.id"
            :device="device"
            :current-time="currentTime"
        ></tr>
    </tbody>
</table>
</template>

<script>
import moment from 'moment';
import Device from './Device.vue';

export default {
    name: 'DeviceList',

    props: ['devices', 'serverTimeOffset'],

    data: () => ({
        currentTime: moment(),
    }),

    mounted () {
        this.startTimer()
    },

    methods: {
        startTimer() {
            setInterval(() => {
                this.currentTime = moment().subtract(this.serverTimeOffset, 'milliseconds');
            }, 1000);
        }
    },

    components: {
        Device
    }
}
</script>
