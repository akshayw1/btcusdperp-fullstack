import { NextResponse } from "next/server";

import { connectMongoDB } from "../../../lib/mongodb";
import OiList from "@/models/oiList";

export async function GET(req: Request) {
  try {
    await connectMongoDB();

    const addNewState = await OiList.updateMany(
      { blocked: { $exists: false } },
      { $set: { blocked: true } }
    );

    const alloiListDocuments = await OiList.find({});
    const hasBitcoin = alloiListDocuments.some(
      (item: { name: string }) => item.name === "Bitcoin"
    );

    if (!hasBitcoin) {
      OiList.create({
        name: "Bitcoin",
      });
      alloiListDocuments.push({ name: "Bitcoin", blocked: false });
    }
    const hasEthereum = alloiListDocuments.some(
      (item: { name: string }) => item.name === "Ethereum"
    );
    if (!hasEthereum) {
      OiList.create({
        name: "Ethereum",
        blocked: false,
      });
      alloiListDocuments.push({ name: "Ethereum", blocked: false });
    }
    if (alloiListDocuments.length > 0) {
      const indexBitcoin = alloiListDocuments.findIndex(
        (item: { name: string }) => item.name === "Bitcoin"
      );
      const indexEthereum = alloiListDocuments.findIndex(
        (item: { name: string }) => item.name === "Ethereum"
      );

      const bitcoinObject = alloiListDocuments.splice(indexBitcoin, 1)[0];
      alloiListDocuments.unshift(bitcoinObject);

      const ethereumObject = alloiListDocuments.splice(indexEthereum, 1)[0];
      alloiListDocuments.splice(1, 0, ethereumObject);

      return NextResponse.json(
        { message: "All oiLists retrieved", data: alloiListDocuments },
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
  try {
    const { pageName, isPageBlock } = await req.json();
    console.log({ pageName, isPageBlock });
    await connectMongoDB();

    const oiListUpdated = await OiList.findOneAndUpdate(
      { name: pageName },
      { $set: { blocked: isPageBlock } },
      { new: true }
    );
    console.log(oiListUpdated);
    if (!oiListUpdated) {
      return NextResponse.json(
        { message: "oiList not found with the specified name" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "oiList updated", data: oiListUpdated },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
