import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "../../../components/EmailTemplate/EmailTemplate";

import nodemailer from "nodemailer";

export async function POST(req: Request) {
  let { email, first, last, message, phone } = await req.json();
  email = email.toUpperCase();

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: "support@btcusdperp.com",
      to: ['support@btcusdperp.com'],
      subject: "support at btcusdperp.com",
      react: EmailTemplate(
        { email: email,
          first: first,
          last:last,
          message:message,
          phone:phone
         }
        ),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.RESET_EMAIL}`,
      pass: `${process.env.RESET_APP_PASS}`,
    },
  });

  const mailOptions = {
    from: process.env.RESET_EMAIL,
    to: process.env.RESET_EMAIL,
    subject: "Contact",
    html: `
    <div style="font-family: Arial, sans-serif; margin: 0 auto;">
    <h2 style="color: #007BFF;">Contact Form Submission</h2>
    <p><strong>Message:</strong> ${message}</p>
    <p><strong>First Name:</strong> ${first}</p>
    <p><strong>Last Name:</strong> ${last}</p>
    <p><strong>From:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
  </div>
    `,
  };

  return await transporter
    .sendMail(mailOptions)
    .then((response: nodemailer.SentMessageInfo) => {
      return NextResponse.json({ message: `email sent` }, { status: 201 });
    })
    .catch((error: nodemailer.SentMessageInfo) => {
      return NextResponse.json(
        { message: "error when sending message", ok: false },
        { status: 201 }
      );
    });
}
