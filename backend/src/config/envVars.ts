import * as z from 'zod';

const envSchema = z.object({
  PORT: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
  CLIENT_URL: z.string().nonempty(),
});

export type EnvVars = z.infer<typeof envSchema>;

export const validateAndGetEnvVariables = () => {
  try {
    const envVars = envSchema.parse(process.env);
    return envVars;
  } catch (error) {
    console.error('🚨 Environment variables validation error:');
    console.error(error);
    process.exit(1);
  }
};
