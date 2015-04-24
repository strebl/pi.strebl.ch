## Introduction

### What is the Pi Finder for?
Often you plug in your Raspberry Pi in a network where you get a random IP
from the DHCP server. In the best situation you have access to the DHCP server / router
and find the IP address.

But what if you ...
* ... don't have access to the DHCP server / router?
* ... don't know the MAC address of your Pi?
* ... see multiple Rasperrys in the network?
* ... don't want to do that work **every time**?

The Pi Finder is here to **solve** all of these problems if you...
* ... dynamically get an IP address in this network (DHCP).
* ... have a internet connection.

### How does it work?
After the initial installation your Pi will notify this site
with it's current IP address and a name you choose.

#### Do I have to start the Pi Finder every time?
No, the Pi Finder starts automatically with your Pi.

#### What happens if the IP changes?
Even if the ip address changes, it will update automatically.

#### How long do I see my Rasperry Pi on this site?
As long as your Pi is running and has access to the server.
After you shut down your Pi, it will be removed after 15 minutes.

#### But I do have an *Arduino, Ubuntu, ...*, does it work for me?
It should work on any Unix based system. However, it's only tested on Raspbian and OSX 10.10.
If you have problems, just create an [Issue](https://github.com/strebl/pi-finder/issues) or even better a [Pull Request](https://github.com/strebl/pi-finder/pulls).

## Installation
**You need to run all these commands on your Rasberry Pi. Therefore you need to get it's IP address the the traditional way.
Hopefully the last time :)**

#### 1. Run the installer
```bash
$ wget http://bit.ly/pi-finder_installer -O - | sudo sh
```

#### 2. Configure
Open the configuration file `config.js`...
```bash
$ sudo nano /usr/lib/node_modules/pi-finder/config.js
```

...and change the name from `My Awesome Pi` to a name you'll recognise.
```javascript
module.exports = {
	// ...
	name: "Manuel's Pi",
	// ...
}
```

#### 3. Start Pi Finder
You can restart your Pi or start the pi-finder manually.
```bash
$ sudo service pi-finder start
```

#### 4. Reboot (optional)
To test the configuration, restart your Pi and check the [Pi Finder](https://pi.strebl.ch)!
```bash
$ sudo reboot
```

## Management
<div class="alert alert-info">
	<strong>You don't need to run these commands!</strong> The Pi Finder starts automatically on system start up.
</div>
#### Start Pi Finder
```bash
$ sudo service pi-finder start 
```

#### Stop Pi Finder
```bash
$ sudo service pi-finder stop 
```

#### Restart Pi Finder
```bash
$ sudo service pi-finder restart 
```

#### Status of the Pi Finder
```bash
$ sudo service pi-finder status 
```