import { UserService } from '@fline/user';

const userService = new UserService();

/**
 * @description Get a user profile
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getProfile(req, res, next) {
  try {
    const user = await userService.findByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ user: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * @description Edit user's profile
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function editProfile(req, res, next) {
  try {
    const user = await userService.findByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ user: 'User not found' });
    }

    await user.update(req.body);

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}
