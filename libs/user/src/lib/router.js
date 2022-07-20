import { authenticate } from '@fline/security';
import { Router } from 'express';
import { getUserInfos} from './controller';

export const userRouter = Router();

userRouter
  .get('/user/:id', authenticate, getUserInfos)
;
