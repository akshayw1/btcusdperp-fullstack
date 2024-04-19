import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../lib/mongodb";
import OiList from "../../../models/oiList";

export async function GET(req: Request) {
  try {
    await connectMongoDB();

    const alloiListDocuments = await OiList.find({});

    if (alloiListDocuments.length > 0) {
      const dataArray = alloiListDocuments.map((doc) => doc.name);
      return NextResponse.json(
        { message: "All oiLists retrieved", data: dataArray },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "All oiLists retrieved", data: [] },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  let { dataSelect } = await req.json();
  await connectMongoDB();
  const oiListUpdated = await OiList.create({ name: dataSelect });

  return NextResponse.json({ message: "oiList updated" }, { status: 201 });
}
export async function DELETE(req: Request) {
  let { dataSelect } = await req.json();
  await connectMongoDB();
  const result = await OiList.deleteOne({ name: dataSelect });

  return NextResponse.json({ message: "oiList updated" }, { status: 201 });
}
