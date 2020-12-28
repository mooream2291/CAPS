//main hub application
'use strict';
//bring in port
const port = process.env.PORT || 3000;
//bring in socket.io library
const io = require('socket.io')(port);
//name space for caps
const caps = io.of('/caps');
//takes in a socket and callback function (listening for anyone to connect to my socket)
io.on('connection', (socket) => {
  console.log('socket is up', socket.id);
});

//socket.io is doing this work now
//brings in events file where our emiiter is
// const events = require('./events-pool');
//require in our driver and vendor
// require('./modules/driver');
// require('./modules/vendor');

//vendor alerts driver that a package needs to be picked up
//may need to put this into each logger separately
// function logger(event, payload) {
//   let timeStamp = Date.now().toString();
//   console.log(event, timeStamp, payload);
// }
const queue = {
  notifications: {}
}

// caps.on('connection', (socket) => {
//   console.log('caps name space', socket.id);
caps.on('connection', socket => {
  socket.on('new notification', payload => {
    console.log('heard new notif', payload);

    const id = uuid();

    queue.notifications[id] = payload;

    socket.emit('added');
  });

  socket.on('get all messages', () => {
    console.log('getting all messages');
    //loop thourhg all of the keys in the queue to get the messages
    Object.keys(queue.notifications).forEach(id => {
      socket.emit('notification', {id, payload: queue.notifications[id]});
    })
  })
})

  socket.on('join', room => {
    // log that they joined the room
    console.log(`${socket.id} is joining ${room}`);
    socket.join(room);
  });
  //driver gets notified that a package needs to be picked up
  socket.on('pick-up', (payload) => {
    console.log('EVENT:', { events: 'pick-up', time: new Date().toString(), payload })
    caps.emit('pick-up', payload)
  });

  //driver sends notification that the package has been picked up
  socket.on('in-transit', (payload) => {
    console.log('EVENT:', { events: 'inTransit', time: new Date().toString(), payload })
    caps.to(payload.storeName).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log('EVENT:', { events: 'delivered', time: new Date().toString(), payload })
    caps.to(payload.storeName).emit('delivered', payload);
  });
});
