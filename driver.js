//driver module
'use strict';
//dependencies
const events = require("./events");
const vendor = require('./vendor');

//listening for notification from vendor
events.on('pick-up', pickUp);

//when a vendor sends a notification, run this callback function to emulate driver notifs
function pickUp (payload){

setTimeOut(()=> {
    console.log(`DRIVER ${payload.orderID}`)
    events.emit('in-transit', payload);
}, 1000);

setTimeOut(()=> {
    console.log('delivered');
    events.emit('delivered to vendor', payload);
}, 3000);
}