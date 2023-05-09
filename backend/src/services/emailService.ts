import fs from 'fs';
import handlebars from 'handlebars';
import { promisify } from 'util';

import { validateAndGetEnvVariables } from '@/config/envVars';
import { mailer } from '@/config/mailer';
import path from 'path';

const readFileAsync = promisify(fs.readFile);

async function readTemplate(name: string) {
  const filePath = path.join(__dirname, `../templates/${name}.hbs`);
  const template = await readFileAsync(filePath, 'utf-8');
  return template;
}

type MailOptions = {
  toEmail: string;
  subject: string;
  html: string;
};

type VerificationData = {
  verificationLink: string;
  firstName: string;
};

const sendVerificationEmail = async (
  data: VerificationData,
  toEmail: string,
) => {
  const template = await readTemplate('signupTemplate');
  const html = handlebars.compile(template)(data);

  const mailOptions = {
    toEmail,
    subject: 'Facebook Clone email verification',
    html,
  };

  await send(mailOptions);
};

const send = async ({ toEmail: to, subject, html }: MailOptions) => {
  const { EMAIL } = validateAndGetEnvVariables();
  const msg = {
    to,
    from: EMAIL,
    subject,
    html,
  };

  try {
    await mailer.send(msg);
    console.info(`💌 Verification Email sent to ${to} successfully 🎉`);
  } catch (error) {
    console.error(`Error sending email to ${to}: ${error}`);
  }
};

export const MailingService = {
  sendVerificationEmail,
};
