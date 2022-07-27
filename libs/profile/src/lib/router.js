import { authenticate } from '@fline/security';
import { Router } from 'express';
import { getProfile, editProfile } from './controller';

export const profileRouter = Router();

profileRouter
  .get('/profile', authenticate, getProfile)
  .put('/profile/edit', authenticate, editProfile);
