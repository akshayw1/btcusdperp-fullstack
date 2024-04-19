import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";

export async function GET(req: Request) {
  await connectMongoDB();

  try {
    const postsFound = await Post.find({}).sort({ createdAt: -1 }).limit(5);

    if (postsFound.length > 0) {
      return NextResponse.json(
        { message: "Latest 5 posts found", posts: postsFound },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "No posts found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred", error: error },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
