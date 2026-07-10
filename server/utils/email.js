import nodemailer from "nodemailer";

/* =========================================
   Create Email Transporter
========================================= */

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =========================================
   Send Email
========================================= */

const sendEmail = async ({
  to,
  subject,
  html,
  text = "",
}) => {
  try {
    const mailOptions = {
      from: `"Mom's Care" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(" Email Sent Successfully");
    console.log("Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error("❌ Email Sending Failed");
    console.error(error.message);

    throw new Error("Unable to send email.");
  }
};

export default sendEmail;