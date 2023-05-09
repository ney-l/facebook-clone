import { RegisterRequestBody } from '@/middlewares/registerUser';
import User from '@/models/User';
import { Request, Response } from 'express';

const register = async (
  req: Request<unknown, unknown, RegisterRequestBody>,
  res: Response,
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

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const userController = { register };

export default userController;
