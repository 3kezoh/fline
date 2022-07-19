import { authenticate } from '@fline/security';
import { Router } from 'express';
import { getfriend } from './controller';

export const friendRouter = Router();

friendRouter.get('/getfriend', authenticate, getfriend);
