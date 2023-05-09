import { validateAndGetEnvVariables } from '@/config/envVars';
import { PostRegisteration } from '@/middlewares/registerUser';
import User from '@/models/User';
import { NextFunction, Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

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

/**
 * Activate the user account
 */
const activateAccount = async (
  req: Request<unknown, unknown, { token: string }>,
  res: Response,
) => {
  try {
    const { token } = req.body;
    const { JWT_SECRET } = validateAndGetEnvVariables();
    const decoded = jwt.verify(token, JWT_SECRET) as {
      exp?: number;
      data?: { userId?: string };
    };

    /**
     * Verify that the token structure is valid
     */
    if (!decoded || !decoded.data || !decoded.data.userId || !decoded.exp) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    /**
     * Verify that the token is not expired
     */
    const {
      exp,
      data: { userId },
    } = decoded;

    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    if (secondsSinceEpoch > exp) {
      return res.status(400).json({ message: 'Token expired' });
    }

    /**
     * Verify that the user exists
     */
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    /**
     * Verify that the user is not already activated
     */
    if (user.verified) {
      return res.status(400).json({ message: 'Account already activated' });
    }

    /**
     * Activate the user
     */
    user.verified = true;
    await user.save();
    return res
      .status(200)
      .json({ message: 'Account activated successfully 🎉' });
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const userController = { register: saveUser, activateAccount };

export default userController;
