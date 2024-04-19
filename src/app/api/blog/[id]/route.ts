import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";

export async function GET(req: Request, { params }: any) {
  const id = params.id;

  await connectMongoDB();
  const postFound = await Post.findById(id);

  if (postFound) {
    postFound.totalViews += 1;

    await postFound.save();

    return NextResponse.json(
      { message: "Post found", post: postFound },
      { status: 201 }
    );
  } else {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
}

export async function DELETE(req: Request, { params }: any) {
  const id = params.id;

  await connectMongoDB();
  const postFound = await Post.findByIdAndDelete(id);

  if (postFound) {
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
}
