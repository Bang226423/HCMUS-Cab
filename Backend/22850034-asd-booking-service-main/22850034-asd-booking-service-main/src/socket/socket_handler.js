const passengerSocketHandler = require('./passenger_socket_handler');
const driverSocketHandler = require('./driver_socket_handler');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        passengerSocketHandler(socket, io);
        driverSocketHandler(socket, io);

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });
};
