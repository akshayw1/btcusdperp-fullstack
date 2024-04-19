import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../../lib/mongodb";
import OiList from "../../../../models/oiList";
export async function GET(req: Request, { params }: any) {
  const oiName = params.name.charAt(0).toUpperCase() + params.name.slice(1);
  console.log({ oiName });
  await connectMongoDB();

  const verifyOI = await OiList.findOne({ name: oiName });
  console.log(verifyOI);
  if (verifyOI) {
    const blocked = verifyOI.blocked !== undefined ? verifyOI.blocked : true;
    return NextResponse.json(
      { blocked, message: "OI Found", oiObject: verifyOI },
      { status: 201 }
    );
  } else
    return NextResponse.json(
      { blocked: true, message: "OI not found returning true by default" },
      { status: 201 }
    );
}
export async function POST(req: Request, { params }: any) {
  const oiName = params.name.charAt(0).toUpperCase() + params.name.slice(1);

  await connectMongoDB();

  const verifyOI = await OiList.findOne({ name: oiName });

  if (verifyOI) {
    const blocked = verifyOI.blocked !== undefined ? verifyOI.blocked : true;
    return NextResponse.json({ blocked }, { status: 201 });
  } else
    return NextResponse.json(
      { blocked: true, message: "OI not found returning true by default" },
      { status: 201 }
    );
}
