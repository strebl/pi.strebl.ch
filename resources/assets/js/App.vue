<template>
<transition name="fade">
    <div class="row" v-if="!loading">
        <transition name="fade" mode="out-in" appear>
            <div class="col-md-10 col-md-offset-1" key="no-devices" v-if="noActiveDevices">
                <div class="tile --shadow js-no-devices">
                    <h2>Nope!</h2>
                    <p class="lead">No Pi poked me recently.</p>
                </div>
            </div>
            <div class="col-md-10 col-md-offset-1" key="devices" v-else>
                <h4 class="table__title">{{ group }} Devices</h4>
                <div class="table-container">
                    <device-list :devices="orderedDeviceList"
                                :server-time-offset="serverTimeOffset"></device-list>
                </div>
            </div>
        </transition>
    </div> <!-- row -->
</transition>
</template>

<script>
import bus from './bus';
import axios from 'axios';
import moment from 'moment';
import DeviceList from './components/DeviceList.vue';

export default {
    name: 'App',

    data: () => ({
        devices: [],
        group: window.location.pathname.split('/')[1] || '',
        serverTimeOffset: 0,
        loading: true,
    }),
    computed: {
        noActiveDevices() {
            return this.devices.length == 0;
        },
        orderedDeviceList () {
            return this.devices.sort((a, b) => a.device_added < b.device_added ? 1 : -1);
        }
    },
    mounted() {
        axios.get('/api/v1/devices/' + this.group).then(({ data }) => {
            this.devices = data.data;
            this.serverTimeOffset = moment(data.server_time).diff(new Date());
            this.loading = false;
        });

        bus.$on('ServerWasPoked', this.updateDevice)
        bus.$on('DeviceWasDeleted', this.removeDevice)
    },
    methods: {
        removeDevice(id) {
            this.devices = this.devices.filter(device => {
                return device.id != id;
            });
        },
        updateDevice(device) {
            this.removeDevice(device.id);
            this.devices.push(device);
        }
    },
    components: {
        DeviceList
    }
}
</script>