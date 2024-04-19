import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  let { token, password } = await req.json();

  await connectMongoDB();
  const hashedPassword = await bcrypt.hash(password, 10);

  const verifyUser = await User.findOneAndUpdate(
    { "resetToken.tokenId": token },
    {
      "resetToken.tokenId": "",
      password: hashedPassword,
    }
  );

  if (verifyUser)
    return NextResponse.json(
      { message: "password reset successfully" },
      { status: 201 }
    );
  else
    return NextResponse.json({ message: "error resetting" }, { status: 201 });
}
