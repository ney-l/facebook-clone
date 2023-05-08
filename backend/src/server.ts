import express, { Request, Response } from 'express';
import cors from 'cors';
import dotevn from 'dotenv';
import { readdirSync } from 'fs';

/**
 * 🔑 Configure environment variables for the app
 */
dotevn.config();

/**
 * Initiate the Express Application
 */
const app = express();

/**
 * 🚪 Configure Cross-Origin Resource Sharing (CORS) for the app
 */
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

/**
 * 🚏 Auto configure routes based on files in src/routes folder
 */
readdirSync('./src/routes')
  .filter((file) => file.endsWith('.ts'))
  .map((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(`./routes/${file}`).default;
    app.use('/api', route);
  });

/**
 * 🏠 Default route
 */
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Facebook Clone API 👋' });
});

/**
 * 🚀 Start listening for incoming requests
 */
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(
    `⚡️[server]: Server is running at http://localhost:${PORT} 🚀 `,
  );
});
