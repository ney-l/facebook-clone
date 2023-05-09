import express from 'express';

import UserController from '@/controllers/users';
import {
  checkEmailAvailability,
  generateLoginToken,
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
  UserController.register,
  sendVerificationEmail,
  generateLoginToken,
);

router.post('/activate', UserController.activateAccount);

export default router;
