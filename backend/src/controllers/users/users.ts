import { PostRegisteration } from '@/middlewares/registerUser';
import User from '@/models/User';
import { NextFunction, Response } from 'express';

const saveUser = async (
  req: PostRegisteration,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      username, // generated unique username added by the middleware
      password, // hashed password added by the middleware
      birthYear,
      birthMonth,
      birthDay,
      gender,
    } = req.body;

    const user = await new User({
      firstName,
      lastName,
      email,
      username,
      password,
      birthYear,
      birthMonth,
      birthDay,
      gender,
    }).save();

    req.body.id = user.id;
    req.body.imageUrl = user.imageUrl;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const userController = { register: saveUser };

export default userController;
