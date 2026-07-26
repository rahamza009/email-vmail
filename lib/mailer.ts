import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"Ameer Hamza | VMail" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}
