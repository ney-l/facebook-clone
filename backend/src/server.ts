import express, { Request, Response } from 'express';
import dotevn from 'dotenv';

// Intantiate express app
const app = express();
dotevn.config();

// Define server port
const PORT = process.env.PORT;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Facebook Clone API' });
});

// Start listening to the requests on the defined port
app.listen(PORT);
