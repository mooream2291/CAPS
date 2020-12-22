//main hub application
'use strict';

//brings in events file where our emiiter is
const events = require('./events');
//require in our driver and vendor
require('./driver');
require('./vendor');

//vendor alerts driver that a package needs to be picked up
function logger (event, payload) {
    let timeStamp = Date.now().toString();
    console.log(event, timeStamp, payload);
}
//driver gets notified that a package needs to be picked up
events.on('pick-up', (payload) => logger('pick-up', payload));

//driver sends notification that the package has been picked up
events.on('in-transit', (payload) => logger('in-transit', payload));

events.on('delivered', (payload) => logger('delivered', payload));

