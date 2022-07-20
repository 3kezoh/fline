import { UserService } from './service';

const userService = new UserService();

export async function getUserInfos(req, res, next) {
  try {
    const user = await userService.getUser(req.params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
}
