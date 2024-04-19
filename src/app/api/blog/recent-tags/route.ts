import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";

export async function GET(req: Request) {
  await connectMongoDB();

  try {
    const postsFound = await Post.find({}).sort({ createdAt: -1 }).limit(20);
    if (postsFound.length > 0) {
      const tagsArray = postsFound.map((post) => post.tag);
      return NextResponse.json(
        { message: "Latest 20 posts' tags found", tags: tagsArray },
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
