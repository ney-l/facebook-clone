import express from 'express';

import userController from '@/controllers/users';
import {
  checkEmailAvailability,
  generateUsername,
  hashPassword,
  sendVerificationEmail,
  validateRegisterRequestBodySchema,
} from '@/middlewares/registerUser';

const router = express.Router();

router.post(
  '/signup',
  validateRegisterRequestBodySchema,
  checkEmailAvailability,
  hashPassword,
  generateUsername,
  userController.register,
  sendVerificationEmail,
);

export default router;
