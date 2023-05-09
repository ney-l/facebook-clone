import express from 'express';

import { SignupController } from '@/controllers/auth';

const router = express.Router();

router.post(
  '/signup',
  SignupController.validateRegisterRequestBodySchema,
  SignupController.checkEmailAvailability,
  SignupController.hashPassword,
  SignupController.generateUsername,
  SignupController.saveUser,
  SignupController.sendVerificationEmail,
  SignupController.generateLoginToken,
);

router.post('/activate', SignupController.activateAccount);

export default router;
