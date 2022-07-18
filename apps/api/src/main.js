/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { sequelize } from '@fline/sequelize';
import { authenticationRouter } from '@fline/authentication';
import { authenticate, checkUserIsVerified } from '@fline/security';
import * as cors from 'cors';
import * as path from 'path';

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

const FLINE_BUILD_PATH = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'dist',
  'apps',
  'fline'
);

app.use(express.static(FLINE_BUILD_PATH));

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

app.get('*', (_req, res) => {
  res.sendFile(path.join(FLINE_BUILD_PATH, 'index.html'));
});

const port = process.env.port || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
