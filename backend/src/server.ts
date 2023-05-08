import express, { Request, Response } from 'express';

// Intantiate express app
const app = express();

// Define server port
const PORT = 3002;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Facebook Clone API' });
});

// Start listening to the requests on the defined port
app.listen(PORT);
