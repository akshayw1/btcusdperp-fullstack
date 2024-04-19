import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import ResetPassword from "../../../components/ResetPassword/ResetPassword";

export async function POST(req: Request) {
  let { email } = await req.json();
  email = email.toUpperCase();
  const token = jwt.sign({ email }, `${process.env.NEXTAUTH_SECRET}`, {
    expiresIn: "1h",
  });
  await connectMongoDB();
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/resetpass/${token}`;
  const resend = new Resend(process.env.RESEND_API_KEY);

  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: `${process.env.RESET_EMAIL}`,
  //     pass: `${process.env.RESET_APP_PASS}`,
  //   },
  // });

  const verifyUser = await User.findOneAndUpdate(
    { email },
    { $set: { "resetToken.tokenId": token } },
    { new: true }
  );

  console.log(resetUrl);

  if (verifyUser) {
    console.log("valid  ");

    try {
      const data = await resend.emails.send({
        from: "support@btcusdperp.com",
        to: [email],
        subject: "Reset Password - btcusdperp.com",
        react: ResetPassword({ resetUrl: resetUrl }),
      });

      return Response.json(data);
    } catch (error) {
      return Response.json({ error });
    }
  } else {
    return NextResponse.json({ message: "user no exist" }, { status: 201 });
  }
}
