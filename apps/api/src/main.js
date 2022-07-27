/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { sequelize } from '@fline/sequelize';
import { authenticationRouter } from '@fline/authentication';
import { chatRouter } from '@fline/chat';
import { authenticate, checkUserIsVerified } from '@fline/security';
import * as cors from 'cors';
import { Server } from 'socket.io';

// TODO: connection should be done in a separate file
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to postgresql successful');

    // TODO: sync should done be in a separate file
    if (process.env.NODE_ENV === 'development') {
      sequelize
        .sync({ alter: true })
        .then(() => {
          console.log('Database synced');
        })
        .catch((err) => {
          console.error('Error syncing database', err);
        });
    }
  })
  .catch((err) => {
    console.error('Error connecting to postgresql', err);
  });

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.use(authenticationRouter);

app.get('/authenticated', authenticate, (req, res) => {
  res.send({ message: 'You are authenticated' });
});

app.get('/verified', authenticate, checkUserIsVerified, (req, res) => {
  res.send({ message: 'You are verified' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

app.use(chatRouter);

const io = new Server(server, {
  cors: { origin: 'http://localhost:4200/chat', methods: ['GET,POST'] },
});

io.on('connection', (socket) => {
  console.log(`Oh ${socket.firstname} est apparue dans la jungle.`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`Oh 🔵 ${socket.firstname} à rejoin la room ${data}.`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log(`Oh 🔴 ${socket.firstname} a disparue dans les nuages.`);
  });
});

/*
io.sockets.on('connection', function(socket) {
  socket.on('username', function(username) {
      socket.username = username;
      io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  socket.on('disconnect', function(username) {
      io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  })

  socket.on('chat_message', function(message) {
      io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });
  

});
*/

server.on('error', console.error);
