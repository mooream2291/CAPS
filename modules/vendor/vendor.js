//vendor module
//dependencies
const faker = require('faker');

require('dotenv').config();

const host = 'http://localhost:3000/caps';
const io = require('socket.io-client');
const { Socket } = require('socket.io-client');
const uuid = require('uuid').v4;

const caps = io.connect(host);
//sets a 5 sec time lapse to send an event notification
const notif = process.argv.splice(2)[0];
console.log(notif);

process.argv[0]
process.argv[1]
process.argv[2]

const queue = {
    notification: {}//??what do I do with this?
}

caps.emit('join', process.env.STORE_NAME);
setInterval(()=> {
//object using faker vars to pass a fake order
    let payload = {
        storeName: process.env.STORE_NAME,
        orderId: faker.random.uuid(),
        customerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        city: `${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`
    }
    console.log(payload);
//triggers pick-up notification to be sent to the driver
//     caps.emit('pick-up', payload);
// }, 5000);
caps.emit('new pick-up', payload);
}, 5000);
//listens for the notification from the driver that the package was delivered
caps.on('delivered', (payload) => {//do I need to change this to not have a payload?
    console.log(`thank you ${payload.orderId}`);
    Socket.disconnect();
});
//function to disaply thank you and order number when vendor gets notif for delivery {






