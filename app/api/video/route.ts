import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Videos";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase()
    const videos = await Video.find().sort({createdAt: -1}).lean()
    if (!videos || videos.length === 0 ){
        return NextResponse.json([],{status: 200})
    }
}