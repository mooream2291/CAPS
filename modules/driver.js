//driver module
'use strict';
//dependencies
const events = require("./events");
const vendor = require('./vendor');

//listening for notification from vendor
events.on('pick-up', pickUp);
events.on('delivery', delivery);

//when a vendor sends a notification, run this callback function to emulate driver notifs
function pickUp(payload) {

    setTimeout(() => {
        console.log(`DRIVER ${payload.orderID}`)
        events.emit('in-transit', payload);
    }, 1000)
}
function delivery (payload) {
        setTimeout(() => {
            console.log('delivered');
            events.emit('delivered to vendor', payload);
        }, 3000)
    }
