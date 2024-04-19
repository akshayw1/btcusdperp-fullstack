import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export async function POST(req: Request) {
  let { email, isVerifiedUser } = await req.json();

  await connectMongoDB();

  const verifyUser = await User.findOneAndUpdate({ email }, { isVerifiedUser });
  return NextResponse.json({ message: "user verify" }, { status: 201 });
}
