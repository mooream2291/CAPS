

//this is my queue to store messages that have not yet been emitted to the recipient
const queue = {
    notification: {}
}

//connect to my caps hub
caps.on('connetion', socket => {
    socket.on('new notification', payload => {
        console.log('heard new notification', payload)
    });
});
