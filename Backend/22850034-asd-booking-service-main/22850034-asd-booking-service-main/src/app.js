require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const tripRoutes = require('./routes/trip_route');
const customerRoutes = require('./routes/customer_route');
const { sequelize } = require('./models');
const socketHandler = require('./socket/socket_handler');
const authenticateRequest = require('./middlewares/auth_middleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(bodyParser.json());

// Temporarily logger
app.use((req, res, next) => {
  console.log('Incoming Request Body:', req.body);
  next();
});

// Init socket connection
app.io = io;

app.use(authenticateRequest);


/** Route management */
app.use('/api/trips', tripRoutes);
app.use('/api/customers', customerRoutes);

/** Handle socket connection */
socketHandler(io);

/** Start the server */
const port = process.env.PORT || 4000;
sequelize.sync().then(() => {
  console.log('HCMUSCab BE PostgreSQL database connected');
  server.listen(port, () => {
    console.log(`HCMUSCab BE is running on http://localhost:${port}`);
  });
});