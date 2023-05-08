import { Request, Response } from 'express';

const getUser = (req: Request, res: Response) => {
  res.json({ message: 'Hello User' });
};

const userController = { getUser };

export default userController;
