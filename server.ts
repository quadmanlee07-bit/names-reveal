import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

// Global variable for error email throttling
let lastErrorEmailSentAt = 0;
const ERROR_EMAIL_COOLDOWN = 15 * 60 * 1000; // 15 minutes

async function notifyAdminOfError(errorContext: string, error: any) {
  const now = Date.now();
  if (now - lastErrorEmailSentAt < ERROR_EMAIL_COOLDOWN) {
    console.log('Admin error notification throttled to avoid spam.');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const errorMessage = error instanceof Error ? error.message : String(error);

    await transporter.sendMail({
      from: `"System Monitor" <${process.env.SMTP_USER}>`,
      to: 'quadman948@gmail.com', // Admin email as requested
      subject: `[ALERT] Production Error in ${errorContext}`,
      text: `An error occurred in ${errorContext}.\n\nTime: ${new Date().toISOString()}\nError: ${errorMessage}\n\nPlease check the server logs for more details.`,
    });
    
    lastErrorEmailSentAt = now;
  } catch (e) {
    console.error('Failed to send error notification email to admin:', e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Headers (applied only to API routes to avoid interfering with Vite's dev server)
  app.use('/api', helmet());
  
  app.use(express.json({ limit: '10kb' })); // Limit body size
  
  // Stricter CORS configuration could be added here if frontend domain is known, 
  // but keeping it open for development unless specified otherwise.
  app.use('/api', cors());

  // Global API Rate Limiter
  const globalLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS) : 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX) : 100, // Limit each IP to 100 requests per window
    message: { error: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api', globalLimiter);

  // Stricter Rate Limiter for Guestbook/Email endpoint
  const guestbookLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 guestbook posts per hour
    message: { error: 'Too many messages sent. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Email sending API endpoint
  app.post('/api/guestbook', guestbookLimiter, async (req, res) => {
    try {
      const { name, message } = req.body;

      if (!name || typeof name !== 'string' || !message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Valid name and message are required' });
      }

      // 1. Get recipient emails from environment variables (comma separated)
      const recipients = process.env.GUESTBOOK_RECIPIENTS;
      
      if (!recipients) {
        console.error('Missing GUESTBOOK_RECIPIENTS environment variable');
        // Do not expose internal misconfiguration to user
        return res.status(500).json({ error: 'Something went wrong. Please try again in a moment. If the problem continues, our team has been notified.' });
      }

      // 2. Configure Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // 3. Send email to multiple recipients
      await transporter.sendMail({
        from: `"Baby Guestbook" <${process.env.SMTP_USER}>`,
        to: recipients,
        subject: `New Guestbook Message from ${name}`,
        text: `You have received a new guestbook message from ${name}:\n\n"${message}"`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #374151; margin-bottom: 20px;">New Guestbook Message</h2>
            <p style="color: #4b5563; font-size: 16px;"><strong>From:</strong> ${name}</p>
            <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin: 20px 0; font-style: italic; color: #1f2937;">
              "${message}"
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">Sent from your baby's welcome page.</p>
          </div>
        `,
      });

      res.status(200).json({ success: true, message: 'Message sent successfully to the family!' });
    } catch (error) {
      // Log the error securely without exposing to client
      console.error('Error sending email:', error);
      
      // Notify Admin
      notifyAdminOfError('/api/guestbook email delivery', error);
      
      // Generic error response to client
      res.status(500).json({ error: 'Something went wrong. Please try again in a moment. If the problem continues, our team has been notified.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
