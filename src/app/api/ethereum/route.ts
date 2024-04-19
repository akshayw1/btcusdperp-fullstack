import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest } from "next";

import { connectMongoDB } from "../../../lib/mongodb";
import Table from "../../../models/table";

export async function POST(req: Request) {
  let { newData, dataSelect } = await req.json();
  await connectMongoDB();
  if (newData) {
    const tableUpdated = await Table.findOneAndUpdate(
      { name: dataSelect },
      { data: newData },
      { new: true }
    );
    if (tableUpdated)
      return NextResponse.json({ message: "table updated" }, { status: 201 });
    else {
      const tableCreated = await Table.create({
        name: dataSelect,
        data: newData,
      });

      if (tableCreated)
        return NextResponse.json({ message: "table updated" }, { status: 201 });
    }
  }
  return NextResponse.json({ message: "table no updated" }, { status: 201 });
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const name: string = searchParams.get("dataSelect")!; // (!) Type assertion

    await connectMongoDB();

    const table = await Table.findOne({ name });

    if (table) {
      return NextResponse.json(
        { message: "table found", data: table.data },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "table not found", data: [] },
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
