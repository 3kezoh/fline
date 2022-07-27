import { authenticate } from '@fline/security';
import { Router } from 'express';
import { getUsers, getUser, editUser } from './controller';

export const administratorRouter = Router();

administratorRouter
  .get('/users', authenticate, getUsers)
  .get('/user/:id', authenticate, getUser)
  .put('/user/:id/edit', authenticate, editUser);
