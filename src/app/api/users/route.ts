import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import User from "../../../models/user";

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const users = await User.find({}).select("email isVerifiedUser admin");

    const response = NextResponse.json({ users }, { status: 201 });

    return response;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    );
  }
}
