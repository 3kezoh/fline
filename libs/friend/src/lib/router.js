import { authenticate } from '@fline/security';
import { Router } from 'express';
import {
  addFriend, blockFriend, getFriend, acceptPendingFriend, rejectFriend, removeFriend,
  unblockFriend, getBlockedFriends, getPendingFriends, getRealFriends,
} from './controller';

export const friendRouter = Router();

friendRouter
  .get('/friend', authenticate, getRealFriends)
  .post('/friend', authenticate, addFriend)
  .delete('/friend', authenticate, removeFriend)
  .post('/friend/block', authenticate, blockFriend)
  .post('/friend/unblock', authenticate, unblockFriend)
  .post('/friend/accept', authenticate, acceptPendingFriend)
  .post('/friend/reject', authenticate, rejectFriend)
  .get('/friend/blocked', authenticate, getBlockedFriends)
  .get('/friend/pending', authenticate, getPendingFriends)
  .get('/friend/all', authenticate, getFriend)
;
