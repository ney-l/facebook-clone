import express, { Request, Response } from 'express';
import cors from 'cors';
import dotevn from 'dotenv';
import { readdirSync } from 'fs';
import { validateAndGetEnvVariables } from './config/envVars';
import { connectToDatabase } from './config/db';

/**
 * 🔑 Configure and validate environment variables
 */
dotevn.config();
const envVars = validateAndGetEnvVariables();

/**
 * Initiate the Express Application
 */
const app = express();

/**
 * 📝 Parse incoming requests with JSON payloads
 */
app.use(express.json());

/**
 * 🚪 Configure Cross-Origin Resource Sharing (CORS) for the app
 */
const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

/**
 * Set up database connection
 */
connectToDatabase(envVars.DATABASE_URL);

/**
 * 🚏 Auto configure routes based on files in src/routes folder
 */
readdirSync('./src/routes')
  .filter((file) => file.endsWith('.ts'))
  .map((file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(`./routes/${file}`).default;
    const [routeName] = file.split('.');
    app.use(`/api/${routeName}`, route);
  });

/**
 * 🏠 Default route
 */
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Facebook Clone API 👋' });
});

/**
 * 🛑 Handle 404 errors
 */
app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: 'Not Found' });
});

/**
 * 🛑 Handle all other errors
 */
app.use((error: Error, req: Request, res: Response) => {
  const message = error.message || 'Internal Server Error';
  return res.status(500).json({ message });
});

/**
 * 🚀 Start listening for incoming requests
 */
const PORT = envVars.PORT;
app.listen(PORT, () => {
  console.info(
    `⚡️[server]: Server is running at http://localhost:${PORT} 🚀 `,
  );
});
