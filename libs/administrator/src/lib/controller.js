import { UserService } from '@fline/user';

const userService = new UserService();

/**
 * @description Get users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getUsers(res, next) {
  try {
    const users = await userService.findAll();

    if (!users) {
      return res.status(404).json({ users: 'No users found' });
    }

    return res.json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * @description Get a user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getUser(req, res, next) {
  try {
    const user = await userService.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ user: 'No user found' });
    }

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * @description Edit a given user
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function editUser(req, res, next) {
  try {
    const user = await userService.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ user: 'User not found' });
    }

    await user.update(req.body);

    return res.json(user);
  } catch (error) {
    return next(error);
  }
}
