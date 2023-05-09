import sgMail from '@sendgrid/mail';

import { validateAndGetEnvVariables } from './envVars';

const { SENDGRID_API_KEY } = validateAndGetEnvVariables();

sgMail.setApiKey(SENDGRID_API_KEY);

export const mailer = sgMail;
