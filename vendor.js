//vendor module
//dependencies
const faker = require('faker');
const events = require('./events');
const name = require(process.env.STORE_NAME);
//use faker
app.use(faker);
//faker objects
const randomName = (faker.name.lastName(), faker.name.firstName());
const randomOrderId = faker.random.number();
const randomCity = (faker.address.city(), faker.address.state(), faker.address.zipCode()); 
//sets a 5 sec time lapse to send an event notification
setInterval(()=> {
//object using faker vars to pass a fake order
    let payload = {
        storeName: name,
        orderId: randomOrderId,
        customerName: randomName,
        city: randomCity
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




