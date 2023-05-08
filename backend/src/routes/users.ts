import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/users', (req: Request, res: Response) => {
  res.json({ message: 'Hello User' });
});

export default router;
