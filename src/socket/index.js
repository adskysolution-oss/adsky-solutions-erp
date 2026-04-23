const { Server } = require('socket.io');

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`🔌 New Socket Connected: ${socket.id}`);

        socket.on('location-update', (data) => {
            // data = { userId, lat, lng, timestamp }
            console.log(`📍 Location Update from User ${data.userId}:`, data.lat, data.lng);
            // Broadcast live location to admins
            io.emit('live-location', data);
        });

        socket.on('disconnect', () => {
            console.log(`❌ Socket Disconnected: ${socket.id}`);
        });
    });

    return io;
};

module.exports = initSocket;
