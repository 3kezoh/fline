import { authenticate } from '@fline/security';
import { Router } from 'express';
import { chat } from './controller';

export const chatRouter = Router();

chatRouter.get('/chat', authenticate, chat);
