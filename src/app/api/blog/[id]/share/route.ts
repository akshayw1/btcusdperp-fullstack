import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";

export async function GET(req: Request, { params }: any) {
  const id = params.id;

  await connectMongoDB();
  const postFound = await Post.findById(id);

  if (postFound) {
    postFound.totalShare += 1;

    await postFound.save();

    return NextResponse.json({ message: "share" }, { status: 201 });
  } else {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
}
