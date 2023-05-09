import express from 'express';

import userController from '@/controllers/users';
import {
  checkEmailAvailability,
  hashPassword,
  validateRegisterRequestBodySchema,
} from '@/middlewares/registerUser';

const router = express.Router();

router.post(
  '/signup',
  validateRegisterRequestBodySchema,
  checkEmailAvailability,
  hashPassword,
  userController.register,
);

export default router;
