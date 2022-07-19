import { UserService } from '@fline/user';

const userService = new UserService();

export async function getfriend(req, res, next) {
  try {
    const friend = await userService.getfriend(req.user.id);

    res.json(friend);
  } catch (error) {
    next(error);
  }
}
