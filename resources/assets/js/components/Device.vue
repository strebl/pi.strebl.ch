<template>
    <tr class="device-row" :id="deviceId">
        <td class="device-name">{{ device.name }}</td>
        <td class="device-ip">{{ device.ip }}</td>
        <td :data-timestamp="device.device_added" class="device-created_at">{{ creationTime }}</td>
        <td :data-timestamp="device.last_contact" class="device-updated_at">{{ relativeTime }}</td>
    </tr>
</template>

<script>
import moment from 'moment';

export default {
    name: 'Device',

    props: ['device', 'currentTime'],

    computed: {
        deviceId () {
            return `device-${this.device.id}`;
        },
        creationTime() {
            return moment(this.device.device_added).from(this.currentTime);
        },
        relativeTime() {
            return moment(this.device.last_contact).from(this.currentTime);
        }
    }
}
</script>

<style>
.device-ip,
.device-created_at,
.device-updated_at {
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
}

.device-created_at,
.device-updated_at {
    text-align: right;
}
</style>

