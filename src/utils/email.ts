import dotenv from 'dotenv';
dotenv.config();

// Use require for CommonJS modules
const brevo = require('@getbrevo/brevo');

// Validate the Brevo API key
const brevoApiKey = process.env.BREVO_API_KEY;
if (!brevoApiKey) {
  throw new Error('BREVO_API_KEY is not defined in the environment variables.');
}

// Initialize Brevo
const brevoClient = new brevo.TransactionalEmailsApi();
brevoClient.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

/**
 * Send a password setup email to a user.
 * @param email - The recipient's email address.
 * @param token - The password setup token.
 */
export const sendPasswordSetupEmail = async (email: string, token: string): Promise<void> => {
  const setupLink = `http://your-frontend-url.com/set-password?token=${token}`;

  const sender = {
    email: process.env.EMAIL_USER, // Your email
    name: 'Church Management System',
  };

  const recipients = [
    {
      email, // Recipient's email
    },
  ];

  const emailContent = {
    subject: 'Set Your Password',
    htmlContent: `
      <p>Welcome to the EMLR system!</p>
      <p>Please set your password by clicking the link below:</p>
      <a href="${setupLink}">Set Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    const response = await brevoClient.sendTransacEmail({
      sender,
      to: recipients,
      ...emailContent,
    });

    console.log('Email sent:', response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};