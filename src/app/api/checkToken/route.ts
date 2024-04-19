import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  let { token } = await req.json();
  try {
    var decoded = jwt.verify(token, `${process.env.NEXTAUTH_SECRET}`);
  } catch (err) {
    return NextResponse.json({ message: "invalid link" }, { status: 201 });
  }
  await connectMongoDB();

  const verifyUser = await User.findOne({ "resetToken.tokenId": token });

  if (verifyUser && verifyUser.resetToken.tokenId !== "")
    return NextResponse.json({ message: "valid link" }, { status: 201 });
  else return NextResponse.json({ message: "invalid link" }, { status: 201 });
}
