//driver module
'use strict';
//dependencies
require('dotenv').config();
const io = require('socket.io-client');
const { Socket } = require('socket.io-client');
//name space for caps
const host = 'http://localhost:3000/caps';
const caps = io.connect(host);

Socket.emit('getall');
//listening for notification from vendor
caps.on('pick-up', (payload) => {

    setTimeout(() => {
        console.log('DRIVER', payload.orderId)
        caps.emit('in-transit', payload);
    }, 1000)

    setTimeout(() => {
        console.log('delivered');
        caps.emit('delivered to vendor', payload);
    }, 3000)
});

//when a vendor sends a notification, run this callback function to emulate driver notifs
