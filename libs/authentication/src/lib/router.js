import { Router } from 'express';
import {
  register,
  login,
  verify,
  resetPassword,
  changePassword,
} from './controller';

export const authenticationRouter = Router();

authenticationRouter
  .post('/register', register)
  .post('/login', login)
  .get('/verify', verify)
  .post('/reset-password', resetPassword)
  .post('/change-password', changePassword);
