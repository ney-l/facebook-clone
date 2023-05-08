import express, { Request, Response } from 'express';
import cors from 'cors';
import dotevn from 'dotenv';

// Intantiate express app
const app = express();
dotevn.config();

// Configure cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Define server port
const PORT = process.env.PORT;

// Create a default route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Facebook Clone API 👋' });
});

// Start listening to the requests on the defined port
app.listen(PORT, () => {
  console.info(
    `⚡️[server]: Server is running at http://localhost:${PORT} 🚀 `,
  );
});
