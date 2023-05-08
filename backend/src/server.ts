import express, { Request, Response } from 'express';
import cors from 'cors';
import dotevn from 'dotenv';

import { readdirSync } from 'fs';

// Intantiate express app
const app = express();
dotevn.config();

// Configure cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Define server port
const PORT = process.env.PORT;

// Auto configure routes
readdirSync('./src/routes')
  .filter((file) => file.endsWith('.ts'))
  .map((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(`./routes/${file}`).default;
    app.use('/api', route);
  });

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
