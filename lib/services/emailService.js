import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendApprovalEmail = async (userEmail, userName, partnerId, orgName) => {
  const mailOptions = {
    from: `"SakhiHub Partners" <${process.env.SMTP_USER}>`,
    to: userEmail,
    subject: `Congratulations! Your SakhiHub Partnership is Approved - ${partnerId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #DEB887; border-radius: 20px; overflow: hidden;">
        <div style="background-color: #B32D2D; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; text-transform: uppercase;">Welcome to SakhiHub</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.8;">Empowering Women Together</p>
        </div>
        <div style="padding: 40px; background-color: #FDFBF7;">
          <h2 style="color: #B32D2D;">Dear ${userName},</h2>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            We are pleased to inform you that your application for the <b>SakhiHub Partner Program</b> has been <b>Approved</b>.
          </p>
          <div style="background-color: white; border: 2px dashed #DEB887; padding: 20px; border-radius: 15px; text-align: center; margin: 30px 0;">
            <p style="margin: 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 2px;">Your Partner ID</p>
            <h1 style="margin: 10px 0; color: #B32D2D; letter-spacing: 5px;">${partnerId}</h1>
          </div>
          <p style="font-size: 14px; color: #555;">
            <b>Organization:</b> ${orgName}<br>
            <b>Status:</b> Active Partner
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
            Our team will contact you shortly with further instructions and training materials.
          </p>
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center;">
            &copy; ${new Date().getFullYear()} AdSky Solution - SakhiHub Initiative. All rights reserved.
          </div>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
