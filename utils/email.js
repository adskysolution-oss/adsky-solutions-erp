import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER || 'support@adskysolution.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
});

export async function sendOnboardingEmail({ name, email, password, role }) {
  const loginLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${role}/login`;

  const mailOptions = {
    from: `"AdSky Solution ERP" <${process.env.EMAIL_USER || 'support@adskysolution.com'}>`,
    to: email,
    subject: 'Welcome to AdSky Solution - Your Account Credentials',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #3b82f6;">Welcome to the Team, ${name}!</h2>
        <p>Your account has been created successfully for the <strong>AdSky Solution ERP</strong>.</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-weight: bold; color: #374151;">Your Login Credentials:</p>
          <p style="margin: 10px 0 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0;"><strong>Temporary Password:</strong> ${password}</p>
        </div>

        <p>For your security, you will be required to change this password when you log in for the first time.</p>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${loginLink}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Log In Now</a>
        </div>

        <hr style="margin-top: 40px; border: 0; border-top: 1px solid #e0e0e0;" />
        <p style="font-size: 12px; color: #555;">If you did not expect this email, please ignore it. This is an automated message from AdSky Solution ERP.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email Send Error:', error);
    return { success: false, error: error.message };
  }
}
