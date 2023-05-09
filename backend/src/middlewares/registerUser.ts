import UserModel from '@/models/User';
import { NextFunction, Request, Response } from 'express';
import * as z from 'zod';
import bcrypt from 'bcrypt';

const RegisterRequestBodySchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  username: z.string().optional(),
  password: z.string().min(8).max(50),
  /**
   * birthYear property has a minimum value of 1900 and a maximum value
   * of the current year minus 16 years (to ensure the user is at
   * least 16 years old).
   */
  birthYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() - 16),
  birthMonth: z.number().int().min(1).max(12),
  birthDay: z.number().int().min(1).max(31),
  gender: z.union([z.literal('male'), z.literal('female'), z.literal('other')]),
});

export type RegisterRequestBody = z.infer<typeof RegisterRequestBodySchema>;

/**
 * This middleware validates the request body against the RegisterRequestBodySchema
 */
export const validateRegisterRequestBodySchema = (
  req: Request<unknown, unknown, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    RegisterRequestBodySchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(JSON.stringify(error.issues));
      const path = error.issues[0].path
        .flatMap((x) => x)
        .map((x) => String(x)[0].toUpperCase() + String(x).slice(1))
        .join(' ');
      const errorMessage = path + ': ' + error.issues[0].message;
      return res.status(400).json({ message: errorMessage });
    }
  }
};

/**
 * This middleware checks if a user with the same email address already exists
 * and returns a error 400 if it does
 */
export const checkEmailAvailability = async (
  req: Request<unknown, unknown, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const user = await UserModel.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({
      message:
        'This email address is already registered. Try logging in instead?',
    });
  }

  next();
};

const NUM_SALT_ROUNDS = 10;

/**
 * This middleware replaces the password in the request body with a hashed password
 */
export const hashPassword = async (
  req: Request<unknown, unknown, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const saltRounds = NUM_SALT_ROUNDS; // the number of salt rounds determines the computational cost of hashing
  const plainTextPassword = req.body.password;

  // generate a salt
  const salt = await bcrypt.genSalt(saltRounds);

  // hash the password with the salt
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

  // replace the password in the request body with the hashed password
  req.body.password = hashedPassword;

  next();
};

export const generateUsername = async (
  req: Request<unknown, unknown, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const { firstName, lastName } = req.body;

  const username = await generateUniqueUsername(firstName, lastName);

  req.body.username = username;

  next();
};

const generateUniqueUsername = async (
  firstName: string,
  lastName: string,
): Promise<string> => {
  let username = `${firstName}.${lastName}`.toLocaleLowerCase();
  let count = 0;

  let user = await UserModel.findOne({ username });

  while (user) {
    count++;
    username = `${firstName}.${lastName}.${count}`.toLocaleLowerCase();
    user = await UserModel.findOne({ username });
  }

  return username;
};
