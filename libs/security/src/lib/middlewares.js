import { verifyToken } from './security';
import { UserService } from '@fline/user';

const userService = new UserService();

/**
 * @description Check the Authorization header for a JWT token
 * @note Attach the user to the request object if a valid token is found
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export async function authenticate(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const [type, token] = req.headers.authorization.split(/\s+/);

  if (type !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization header' });
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const user = await userService.findByEmail(decodedToken.email);

  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = user;

  return next();
}

/**
 * @description Check if the user is verified
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export function checkUserIsVerified(req, res, next) {
  if (!req.user.isVerified) {
    return res.status(401).json({ error: 'User is not verified' });
  }

  return next();
}

/**
 * @description Check if the user is an admin
 * @param {Request} req
 * @param {Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
export function checkUserIsAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(401).json({ error: 'User is not an admin' });
  }

  return next();
}
