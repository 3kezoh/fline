//const userService = new UserService();

export async function chat(req, res, next) {
  try {
    //Recuperer le user via req.user
    const user = req.user;

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}
