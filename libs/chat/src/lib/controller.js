//const userService = new UserService();
import { useState } from 'react';

export async function chat(req, res, next) {
  try {
    //Recuperer le user via req.user
    const user = req.user;

    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function room(req, res, next) {
  try {
    //Recuperer la room
    const [room, setRoom] = useState();

    return res.status(201).json(room);
  } catch (error) {
    return next(error);
  }
}
