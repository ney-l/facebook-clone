import express from 'express';

import userController from '@/controllers/users';

const router = express.Router();

router.get('/users', userController.getUser);

export default router;
