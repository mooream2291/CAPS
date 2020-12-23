//vendor module
//dependencies
const faker = require('faker');
const events = require('./events');;
//sets a 5 sec time lapse to send an event notification
setInterval(()=> {
//object using faker vars to pass a fake order
    let payload = {
        storeName: process.env.STORE_NAME,
        orderId: faker.random.uuid(),
        customerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        city: `${faker.address.city()} ${faker.address.stateAbbr()} ${faker.address.zipCode()}`
    }
//triggers pick-up notification to be sent to the driver
    events.emit('pick-up', payload);
}, 5000);

//listens for the notification from the driver that the package was delivered
events.on('delivered', deliverHandler);
//function to disaply thank you and order number when vendor gets notif for delivery
function deliverHandler(payload) {
    console.log(`thank you ${payload.orderId}`);
}




