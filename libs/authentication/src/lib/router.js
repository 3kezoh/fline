import { Router } from 'express';
import { register, login, verify } from './controller';

export const authenticationRouter = Router();

authenticationRouter
  .post('/register', register)
  .post('/login', login)
  .get('/verify', verify);
