const http = require('http');
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
const initSocket = require('./src/socket');
initSocket(server);

// Start Server
server.listen(PORT, () => {
    console.log(`
    =========================================
    🚀 ADSKY BACKEND SERVER RUNNING
    🔗 PORT: ${PORT}
    🏠 NODE_ENV: ${process.env.NODE_ENV}
    =========================================
    `);
});
