import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import jwt from "jsonwebtoken";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";

export async function POST(req: Request) {
  const data = await req.formData();
  const file: File | null = data.get("image") as unknown as File;
  const title: string = data.get("title") as unknown as string;
  const text: string = data.get("text") as unknown as string;
  const author: string = data.get("author") as unknown as string;
  const tag: string = data.get("tag") as unknown as string;
  const tags: string[] = data.getAll("tags") as string[];
  if (!file || !title || !author || !text || !tag) {
    return NextResponse.json({ success: false, error: "data missing" });
  }
  const token = jwt.sign({ name: file.name }, `${process.env.NEXTAUTH_SECRET}`);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const storageRef = ref(storage, `images/${token}`);
  const uploadTask = uploadBytesResumable(storageRef, buffer, {
    contentType: file.type, // Assuming file.type holds the original mime-type
  });

  const imageUrl: string = await new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });

  await connectMongoDB();
  const postCreated = await Post.create({
    title,
    text,
    author,
    imageUrl,
    tag,
    datePost: new Date(),
  });
  if (postCreated)
    return NextResponse.json(
      { message: "Post created", postID: postCreated.id },
      { status: 201 }
    );
  else
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 400 }
    );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  await connectMongoDB();

  try {
    let postsQuery = {};
    const tag = searchParams.get("tag");
    if (tag && tag !== "") {
      postsQuery = { tag: tag };
    }

    const totalPosts = await Post.countDocuments(postsQuery);

    const postsPerPage = 9;

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const page = searchParams.get("page")!
      ? parseInt(searchParams.get("page")! as string)
      : 1;

    const startIndex = (page - 1) * postsPerPage;

    const postsFound = await Post.aggregate([
      { $match: postsQuery },
      { $skip: startIndex },
      { $limit: postsPerPage },
    ]);

    if (postsFound.length > 0) {
      return NextResponse.json(
        {
          message: `Page ${page} of ${totalPages}`,
          posts: postsFound,
          totalPages: totalPages,
          currentPage: page,
        },
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
export async function PATCH(req: Request) {
  const data = await req.formData();
  const postId: string = data.get("postId") as unknown as string;
  const file: File | null = data.get("image") as unknown as File;
  const title: string = data.get("title") as unknown as string;
  const text: string = data.get("text") as unknown as string;
  const author: string = data.get("author") as unknown as string;
  const tag: string = data.get("tag") as unknown as string;
  const tags: string[] = data.getAll("tags") as string[];

  if (!postId || !title || !author || !text || !tag) {
    return NextResponse.json({ success: false, error: "data missing" });
  }

  let imageUrl: string | undefined;

  if (file) {
    const token = jwt.sign(
      { name: file.name },
      `${process.env.NEXTAUTH_SECRET}`
    );
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const storageRef = ref(storage, `images/${token}`);
    const uploadTask = uploadBytesResumable(storageRef, buffer, {
      contentType: file.type, // Assuming file.type holds the original mime-type
    });

    imageUrl = await new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }

  await connectMongoDB();

  try {
    const postUpdated = await Post.findByIdAndUpdate(postId, {
      title,
      text,
      author,
      imageUrl,
      tag,
      datePost: new Date(),
    });

    if (postUpdated) {
      return NextResponse.json(
        { message: "Post updated", postId },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Error updating post" },
      { status: 500 }
    );
  }
}
