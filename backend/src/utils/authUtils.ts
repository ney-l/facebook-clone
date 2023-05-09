import jwt from 'jsonwebtoken';

import { validateAndGetEnvVariables } from '@/config/envVars';

export type TokenPayload = {
  userId: string;
};

type ExpiresIn = '1h' | '7d';

export const generateToken = (
  payload: TokenPayload,
  expiresIn: ExpiresIn = '1h',
) => {
  const { JWT_SECRET } = validateAndGetEnvVariables();

  try {
    return jwt.sign({ data: payload }, JWT_SECRET, { expiresIn });
  } catch (error) {
    console.log(error);
    throw new Error('Error generating token');
  }
};
